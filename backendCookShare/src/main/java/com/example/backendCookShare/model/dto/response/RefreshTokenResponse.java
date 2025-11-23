package com.cookshare.backend.model.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
}
