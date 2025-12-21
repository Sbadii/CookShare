package com.example.backendCookShare.model.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostResponse {
    private Long id;
    private String title;
    private String description;
    private String tutorial;
    private String ingredients;
    private String cookingTime;
    private String imageUrl;
    private LocalDateTime createdAt;
    private String theme;
    private String type;
    private String diet;
    private String authorName;
    private Long likeCount;
    private Long commentCount;
}
