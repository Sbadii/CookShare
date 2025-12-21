package com.example.backendCookShare.mapper;

import com.example.backendCookShare.model.dto.response.PostResponse;
import com.example.backendCookShare.model.entity.Post;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

    public PostResponse toResponse(Post post) {
        System.out.println("Processing Post ID: " + post.getId() + ", ImageUrl: " + post.getImageUrl());
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .tutorial(post.getTutorial())
                .ingredients(post.getIngredients())
                .cookingTime(post.getCookingTime())
                .imageUrl(post.getImageUrl())
                .createdAt(post.getCreatedAt())
                .theme(post.getTheme() != null ? post.getTheme().name() : null)
                .type(post.getType() != null ? post.getType().name() : null)
                .diet(post.getDiet() != null ? post.getDiet().name() : null)
                .authorName(post.getAuthor() != null ? post.getAuthor().getUsername() : "Unknown")
                .likeCount(post.getLikes() != null ? (long) post.getLikes().size() : 0L)
                .commentCount(post.getComments() != null ? (long) post.getComments().size() : 0L)
                .build();
    }
}
