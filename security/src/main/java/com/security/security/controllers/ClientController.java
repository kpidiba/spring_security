package com.security.security.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/client")
public class ClientController {

    @GetMapping
    public String get() {
        return "GET:: CLIENT CONTROLLER";
    }

    @PostMapping
    public String post() {
        return "POST:: CLIENT CONTROLLER";
    }

    @PutMapping
    public String put() {
        return "PUT:: CLIENT CONTROLLER";
    }

    @DeleteMapping
    public String delete() {
        return "DELETE:: CLIENT CONTROLLER";
    }
}
