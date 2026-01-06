package com.example.backendCookShare.controller;

import com.example.backendCookShare.model.dto.request.PostRequest;
import com.example.backendCookShare.model.dto.response.PostResponse;
import com.example.backendCookShare.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts(@RequestParam(required = false) String query) {
        if (query != null && !query.isEmpty()) {
            log.info("🔍 Searching posts with query: {}", query);
            return ResponseEntity.ok(postService.searchPosts(query));
        }
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostResponse> createPost(
            @RequestPart("post") PostRequest request,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        log.info("📝 Received post creation request");
        log.info("Title: {}", request.getTitle());
        log.info("Description: {}", request.getDescription());
        log.info("Theme: {}", request.getTheme());
        log.info("Type: {}", request.getType());
        log.info("Diet: {}", request.getDiet());
        log.info("Image present: {}", image != null);

        if (image != null) {
            log.info("Image name: {}", image.getOriginalFilename());
            log.info("Image size: {} bytes", image.getSize());
        }

        try {
            PostResponse response = postService.createPost(request, image);
            log.info("✅ Post created successfully with ID: {}", response.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ Error creating post: {}", e.getMessage(), e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        log.info("🗑️ Received request to delete post with ID: {}", id);
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
