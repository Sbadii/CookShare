package com.example.backendCookShare.service;

import com.example.backendCookShare.model.dto.request.LoginRequest;
import com.example.backendCookShare.model.dto.request.RegisterRequest;
import com.example.backendCookShare.model.dto.response.AuthResponse;
import com.example.backendCookShare.model.entity.User;
import com.example.backendCookShare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // =============================
    // REGISTER
    // =============================
    public AuthResponse register(RegisterRequest request, org.springframework.web.multipart.MultipartFile avatar) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String avatarUrl = null;
        if (avatar != null && !avatar.isEmpty()) {
            try {
                String filename = System.currentTimeMillis() + "_" + avatar.getOriginalFilename();
                java.nio.file.Path uploadDir = java.nio.file.Paths.get("uploads");
                if (!java.nio.file.Files.exists(uploadDir)) {
                    java.nio.file.Files.createDirectories(uploadDir);
                }
                java.nio.file.Path path = uploadDir.resolve(filename);
                java.nio.file.Files.copy(avatar.getInputStream(), path);
                avatarUrl = "http://localhost:8080/uploads/" + filename;
            } catch (java.io.IOException e) {
                throw new RuntimeException("Failed to upload avatar", e);
            }
        }

        User user = User.builder()
                .username(request.getUsername())
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .avatarUrl(avatarUrl)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getAvatarUrl());
    }

    // =============================
    // LOGIN
    // =============================
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getAvatarUrl());
    }
}
