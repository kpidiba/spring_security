package com.security.security.services;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.security.security.config.security.JwtService;
import com.security.security.exception.InvalidTokenException;
import com.security.security.models.auth.Role;
import com.security.security.models.auth.User;
import com.security.security.models.request.AuthenticationRequest;
import com.security.security.models.request.AuthenticationResponse;
import com.security.security.models.request.RegisterRequest;
import com.security.security.models.token.Token;
import com.security.security.models.token.TokenType;
import com.security.security.repository.TokenRepository;
import com.security.security.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@Service
public class AuthenticationService {
        private UserRepository userRepository;
        private TokenRepository tokenRepository;
        private JwtService jwtService;
        private AuthenticationManager authenticationManager;

        AuthenticationService(UserRepository userRepository, JwtService jwtService,
                        AuthenticationManager authenticationManager, TokenRepository repository) {
                this.userRepository = userRepository;
                this.authenticationManager = authenticationManager;
                this.jwtService = jwtService;
                this.tokenRepository = repository;
        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        public AuthenticationResponse register(RegisterRequest request) {

                // NOTE:Check the role
                Role role;
                switch (request.getRole()) {
                        case "USER":
                                role = Role.USER;
                                break;
                        case "ADMIN":
                                role = Role.ADMIN;
                                break;
                        case "CLIENT":
                                role = Role.CLIENT;
                                break;
                        default:
                                throw new IllegalArgumentException("Invalid role: ");
                }

                // NOTE: CREATE USER
                var user = User.builder()
                                .username(request.getUsername())
                                .password(passwordEncoder().encode(request.getPassword()))
                                .role(role)
                                .build();
                var savedUser = userRepository.save(user);
                // NOTE:GENERATE TOKEN

                var jwtToken = jwtService.generateToken(user);
                var token = createToken(savedUser, jwtToken, TokenType.BEARER);
                this.tokenRepository.save(token);

                var refreshToken = jwtService.generateRefreshToken(user);
                var tokenRefresh = createToken(savedUser, refreshToken, TokenType.BEARER);
                this.tokenRepository.save(tokenRefresh);
                
                return AuthenticationResponse.builder()
                                .accessToken(jwtToken)
                                .refreshToken(refreshToken)
                                .name(user.getUsername())
                                .role(user.getRole().toString())
                                .build();
        }

        private Token createToken(User savedUser, String refreshToken, TokenType bearer) {
                return Token.builder().user(savedUser)
                                .tokenType(TokenType.BEARER)
                                .revoked(false)
                                .expired(false)
                                .token(refreshToken)
                                .build();
        }

        public AuthenticationResponse login(AuthenticationRequest request) throws IOException {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request
                                .getUsername(), request.getPassword()));
                var user = userRepository.findByUsername(request.getUsername())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                var refreshToken = jwtService.generateRefreshToken(user);
                return AuthenticationResponse.builder()
                                .role(user.getRole()
                                                .toString())
                                .name(user.getUsername())
                                .accessToken(jwtToken)
                                .refreshToken(refreshToken)
                                .build();
        }

        public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
                final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
                final String refreshToken;
                final String username;
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                        return;
                }
                refreshToken = authHeader.substring(7);
                username = jwtService.extractUsername(refreshToken);
                try {
                        if (username != null) {
                                var user = this.userRepository.findByUsername(username).orElseThrow();
                                if (jwtService.isTokenValid(refreshToken, user)) {
                                        var accessToken = jwtService.generateToken(user);
                                        var authResponse = AuthenticationResponse.builder()
                                                        .accessToken(accessToken)
                                                        .refreshToken(refreshToken)
                                                        .name(user.getUsername())
                                                        .role(user.getRole().toString())
                                                        .build();
                                        new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
                                }
                        }
                } catch (Exception e) {
                        throw new InvalidTokenException("refresh token expired");
                }
        }

}
