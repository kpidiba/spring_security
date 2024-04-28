package com.security.security.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    @GetMapping
    public String get() {
        return "GET:: admin controller";
    }

    @PostMapping
    public String post() {
        return "POST:: ADMIN CONTROLLER";
    }

    @PutMapping
    public String put() {
        return "PUT:: ADMIN CONTROLLER";
    }

    @DeleteMapping
    public String delete() {
        return "DELETE:: ADMIN CONTROLLER";
    }
}
