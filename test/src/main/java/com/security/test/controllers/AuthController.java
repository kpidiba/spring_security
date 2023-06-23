package com.security.test.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.test.config.security.AuthenticationRequest;
import com.security.test.config.security.AuthenticationResponse;
import com.security.test.config.security.RegisterRequest;
import com.security.test.services.AuthenticationService;



@RestController
// @CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthenticationService service;
    
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.login(request));
    }

    // public ResponseEntity<String> login(@RequestBody AuthenticationRequest request){
    //     System.out.println("request:"+request);
    //     return ResponseEntity.ok("man in");
    // }

    
}