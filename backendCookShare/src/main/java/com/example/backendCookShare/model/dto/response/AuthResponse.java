package com.cookshare.backend.model.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String token;
    private Long userId;
    private String username;
    private String email;
}
