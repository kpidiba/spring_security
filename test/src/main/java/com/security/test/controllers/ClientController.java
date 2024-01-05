package com.security.test.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/client")
@PreAuthorize("hasRole('CLIENT')")
public class ClientController {

    @GetMapping
    @PreAuthorize("hasAuthority('client:read')")
    public String get() {
        return "GET:: CLIENT CONTROLLER";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('client:create')")
    public String post() {
        return "POST:: CLIENT CONTROLLER";
    }

    @PutMapping
    @PreAuthorize("hasAuthority('client:update')")
    public String put() {
        return "PUT:: CLIENT CONTROLLER";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('client:delete')")
    public String delete() {
        return "DELETE:: CLIENT CONTROLLER";
    }
}
