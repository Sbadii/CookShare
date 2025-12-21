package com.example.backendCookShare.service;

import com.example.backendCookShare.mapper.PostMapper;
import com.example.backendCookShare.model.dto.response.PostResponse;
import com.example.backendCookShare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final com.example.backendCookShare.repository.UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .map(postMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public PostResponse createPost(com.example.backendCookShare.model.dto.request.PostRequest request,
            org.springframework.web.multipart.MultipartFile image) {

        log.info("🔍 Starting post creation process...");

        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication()
                .getName();
        log.info("User email from security context: {}", email);

        com.example.backendCookShare.model.entity.User author = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("❌ User not found with email: {}", email);
                    return new RuntimeException("User not found");
                });
        log.info("✅ User found: {} (ID: {})", author.getUsername(), author.getId());

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            try {
                log.info("📸 Processing image upload...");
                String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads");
                if (!java.nio.file.Files.exists(uploadDir)) {
                    log.info("Creating uploads directory...");
                    java.nio.file.Files.createDirectories(uploadDir);
                }
                java.nio.file.Path path = uploadDir.resolve(filename);
                java.nio.file.Files.copy(image.getInputStream(), path);

                // Construct the URL. Assuming backend runs on 8080.
                // Consider making the base URL configurable.
                imageUrl = "http://localhost:8080/uploads/" + filename;
                log.info("✅ Image uploaded successfully: {}", imageUrl);
            } catch (java.io.IOException e) {
                log.error("❌ Failed to upload image: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to upload image", e);
            }
        } else {
            log.info("ℹ️ No image provided");
        }

        log.info("🏗️ Building post entity...");
        com.example.backendCookShare.model.entity.Post post = com.example.backendCookShare.model.entity.Post.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .tutorial(request.getTutorial())
                .ingredients(request.getIngredients())
                .cookingTime(request.getCookingTime())
                .theme(request.getTheme())
                .type(request.getType())
                .diet(request.getDiet())
                .author(author)
                .imageUrl(imageUrl)
                .createdAt(java.time.LocalDateTime.now())
                .build();

        log.info("💾 Saving post to database...");
        com.example.backendCookShare.model.entity.Post savedPost = postRepository.save(post);
        log.info("✅ Post saved with ID: {}", savedPost.getId());

        return postMapper.toResponse(savedPost);
    }
}
