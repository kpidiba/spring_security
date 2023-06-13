package com.security.test.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
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

@Service
public class AuthenticationService {
        @Autowired
        private UserRepository userRepository;

        @Autowired
        private JwtService jwtService;
        @Autowired
        private AuthenticationManager authenticationManager;

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        public AuthenticationResponse register(RegisterRequest request) {
                var user = User.builder()
                                .username(request.getUsername())
                                .password(passwordEncoder().encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                userRepository.save(user);
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
