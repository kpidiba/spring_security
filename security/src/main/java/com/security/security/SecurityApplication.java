package com.security.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.security.security.models.request.RegisterRequest;
import com.security.security.services.AuthenticationService;

@SpringBootApplication
public class SecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(AuthenticationService service)
	{
		return args -> {
			var admin = RegisterRequest.builder()
			.username("KbrightCoder")
			.password("password")
			.build();
			System.out.println("Admin token: "+admin);
		};
	}

}
