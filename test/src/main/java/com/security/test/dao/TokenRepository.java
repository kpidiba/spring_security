package com.security.test.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.security.test.token.Token;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    @Query("""
            select t from Token t inner join User u on t.user.id = u.id where u.id = :userId and (t.revoked = false or t.expired = false)
            """)
    List<Token> findAllValidTokenByUser(Integer userId);

    Optional<Token> findByToken(String token);
}
