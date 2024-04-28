package com.security.security.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.security.security.models.auth.User;


public interface  UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);
    boolean existsUserByUsername(String username);
}