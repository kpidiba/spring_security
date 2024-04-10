package com.security.security.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

        private static final String[] WHITE_LIST_URL = { "/api/v1/auth/**",
                        "/v2/api-docs",
                        "/v3/api-docs",
                        "/v3/api-docs/**", };
        @Autowired
        private JwtAuthentificationFilter jwtAuthentificationFilter;
        @Autowired
        private AuthenticationProvider authentificationProvider;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(
                                (authorize) -> authorize.requestMatchers(WHITE_LIST_URL)
                                        .permitAll()
                                        // .requestMatchers("/api/v1/admin/**").hasRole(ADMIN.name())
                                        // .requestMatchers(HttpMethod.GET,
                                        // "/api/v1/admin/**").hasAuthority(ADMIN_READ.name())
                                        // .requestMatchers(HttpMethod.POST, "/api/v1/admin/**")
                                        // .hasAnyAuthority(ADMIN_CREATE.name())
                                        // .requestMatchers(HttpMethod.PUT, "/api/v1/admin/**")
                                        // .hasAnyAuthority(ADMIN_UPDATE.name())
                                        // .requestMatchers(HttpMethod.DELETE,
                                        // "/api/v1/admin/**")
                                        // .hasAnyAuthority(ADMIN_DELETE.name())
                                .anyRequest()
                                .authenticated())
                                .sessionManagement((session) -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authentificationProvider)
                                .addFilterBefore(jwtAuthentificationFilter, UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }
}
