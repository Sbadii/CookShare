package com.example.backendCookShare.config;

import com.example.backendCookShare.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthFilter jwtAuthFilter;
        private final org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http
                                .csrf(csrf -> csrf.disable())

                                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/auth/**", "/uploads/**", "/error", "/actuator/**")
                                                .permitAll()
                                                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**")
                                                .permitAll()
                                                .anyRequest().authenticated() // tout le reste sécurisé
                                )

                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer webSecurityCustomizer() {
                return (web) -> web.ignoring().requestMatchers("/uploads/**", "/actuator/**", "/error");
        }
}
