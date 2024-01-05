package com.security.test.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.security.test.config.security.AuthenticationRequest;
import com.security.test.config.security.AuthenticationResponse;
import com.security.test.config.security.JwtService;
import com.security.test.config.security.RegisterRequest;
import com.security.test.dao.UserRepository;
import com.security.test.models.Role;
import com.security.test.models.User;

@Configuration
@Service
public class AuthenticationService {
        private UserRepository userRepository;

        private JwtService jwtService;
        private AuthenticationManager authenticationManager;

        AuthenticationService(UserRepository userRepository, JwtService jwtService,
                        AuthenticationManager authenticationManager) {
                this.userRepository = userRepository;
                this.authenticationManager = authenticationManager;
                this.jwtService = jwtService;
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
                userRepository.save(user);

                // NOTE:GENERATE TOKEN
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .name(user.getUsername())
                                .role(user.getRole().toString())
                                .build();
        }

        public AuthenticationResponse login(AuthenticationRequest request) {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request
                                .getUsername(), request.getPassword()));
                var user = userRepository.findByUsername(request.getUsername())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .role(user.getRole()
                                                .toString())
                                .name(user.getUsername())
                                .token(jwtToken)
                                .build();
        }

}
