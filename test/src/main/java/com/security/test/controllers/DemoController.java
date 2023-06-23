package com.security.test.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.test.models.User;
import com.security.test.services.UserService;
@RestController
// @CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/v1/test")
public class DemoController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok(userService.getAll());
    } 
}
