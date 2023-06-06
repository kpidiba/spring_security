package com.security.test.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Autowired
    private JwtAuthentificationFilter jwtAuthentificationFilter;
    @Autowired
    private AuthenticationProvider authentificationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
            .cors(cors-> cors.disable())
            .csrf(csrf ->csrf.disable())
            .authorizeHttpRequests((authorize) -> authorize.requestMatchers("api/v1/auth/**")
            .permitAll()
            .anyRequest()
            .authenticated())
            .sessionManagement((session)-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authentificationProvider)
            .addFilterBefore(jwtAuthentificationFilter,UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
