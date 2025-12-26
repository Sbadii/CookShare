package com.example.backendCookShare.service;

import com.example.backendCookShare.model.dto.request.CommentRequest;
import com.example.backendCookShare.model.dto.response.CommentResponse;
import com.example.backendCookShare.model.entity.Comment;
import com.example.backendCookShare.model.entity.Post;
import com.example.backendCookShare.model.entity.User;
import com.example.backendCookShare.repository.CommentRepository;
import com.example.backendCookShare.repository.PostRepository;
import com.example.backendCookShare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public CommentResponse addComment(CommentRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User author = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = Comment.builder()
                .content(request.getContent())
                .post(post)
                .author(author)
                .createdAt(LocalDateTime.now())
                .build();

        Comment savedComment = commentRepository.save(comment);

        return CommentResponse.builder()
                .id(savedComment.getId())
                .content(savedComment.getContent())
                .authorName(savedComment.getAuthor().getUsername())
                .createdAt(savedComment.getCreatedAt())
                .build();
    }
}
