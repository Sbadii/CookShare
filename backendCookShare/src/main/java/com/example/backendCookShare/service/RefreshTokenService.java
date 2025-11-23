package com.example.backendCookShare.service;

import com.example.backendCookShare.model.entity.RefreshToken;
import com.example.backendCookShare.model.entity.User;
import com.example.backendCookShare.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    /**
     * Crée un refresh token pour un utilisateur.
     * Supprime l'ancien s’il existe, afin d'éviter plusieurs tokens actifs
     */
    public RefreshToken createRefreshToken(User user) {

        // Supprimer l'ancien token si existe
        refreshTokenRepository.findByUser(user)
                .ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusSeconds(60 * 60 * 24 * 7)) // expire à 7 jours
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    /**
     * Chercher un refresh token par sa valeur
     */
    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    /**
     * Vérifie si le refresh token est expiré
     */
    public RefreshToken verifyExpiration(RefreshToken token) {

        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired. Please sign in again.");
        }

        return token;
    }
}
