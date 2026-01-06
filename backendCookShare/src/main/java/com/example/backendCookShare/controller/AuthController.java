package com.example.backendCookShare.controller;

import com.example.backendCookShare.model.dto.request.LoginRequest;
import com.example.backendCookShare.model.dto.request.RegisterRequest;
import com.example.backendCookShare.model.dto.response.AuthResponse;
import com.example.backendCookShare.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping(value = "/register", consumes = org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AuthResponse> register(
            @RequestPart("user") RegisterRequest request,
            @RequestPart(value = "avatar", required = false) org.springframework.web.multipart.MultipartFile avatar) {
        return ResponseEntity.ok(authService.register(request, avatar));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
