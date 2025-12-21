package com.example.backendCookShare.model.dto.request;

import com.example.backendCookShare.model.enums.Diet;
import com.example.backendCookShare.model.enums.PostType;
import com.example.backendCookShare.model.enums.Theme;
import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String description;
    private String tutorial;
    private String ingredients;
    private String cookingTime;
    private Theme theme;
    private PostType type;
    private Diet diet;
}
