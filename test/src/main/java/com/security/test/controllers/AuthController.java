package com.security.test.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.test.config.security.AuthenticationRequest;
import com.security.test.config.security.AuthenticationResponse;
import com.security.test.config.security.RegisterRequest;
import com.security.test.dao.UserRepository;
import com.security.test.services.AuthenticationService;

@RestController

@RequestMapping("/api/v1/auth")
public class AuthController {
    private AuthenticationService service;
    private UserRepository userRepository;

    public AuthController(AuthenticationService service, UserRepository repository) {
        this.service = service;
        this.userRepository = repository;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        if (!this.userRepository.existsUserByUsername(request.getUsername())) {
            return ResponseEntity.ok(service.register(request));
        }else{
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(service.login(request));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("TOKEN ERREUR");
        }
    }

}