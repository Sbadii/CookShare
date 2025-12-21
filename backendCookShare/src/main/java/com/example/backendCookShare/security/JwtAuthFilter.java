package com.example.backendCookShare.security;

import com.example.backendCookShare.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String requestURI = request.getRequestURI();
        final String method = request.getMethod();

        log.debug("🔐 JWT Filter - {} {}", method, requestURI);

        // No JWT provided → let the request pass
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.debug("No JWT token found in request");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extract JWT token (skip "Bearer ")
            String token = authHeader.substring(7);
            String email = jwtService.extractEmail(token);

            log.debug("📧 Extracted email from token: {}", email);

            // If email exists and user is not authenticated yet
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                log.debug("👤 User details loaded for: {}", email);

                // Validate token with email instead of UserDetails
                if (jwtService.isTokenValid(token, email)) {
                    log.debug("✅ Token is valid for user: {}", email);

                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(auth);
                    log.debug("✅ Authentication set in SecurityContext");
                } else {
                    log.warn("❌ Token is invalid for user: {}", email);
                }
            }
        } catch (Exception e) {
            log.error("❌ Error processing JWT token: {}", e.getMessage(), e);
        }

        filterChain.doFilter(request, response);
    }
}
