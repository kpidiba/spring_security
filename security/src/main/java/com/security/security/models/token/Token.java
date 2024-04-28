package com.security.security.models.token;

import com.security.security.models.auth.User;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Id
    @GeneratedValue
    private Long id;
    private String token;
    private boolean expired;
    private boolean revoked;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    @ManyToOne
    private User user;
}
