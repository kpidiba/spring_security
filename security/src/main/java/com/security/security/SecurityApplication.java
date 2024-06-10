package com.security.security;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.security.security.models.request.RegisterRequest;
import com.security.security.repository.UserRepository;
import com.security.security.services.AuthenticationService;

@SpringBootApplication
public class SecurityApplication {

	@Bean
	CommandLineRunner init(UserRepository repository,AuthenticationService service) {
		return args -> {
			if (!repository.existsUserByUsername("admin")) {
				service.register(new RegisterRequest("admin","password","ADMIN"));
			}
		};
	}
	
	public static void main(String[] args) {
		SpringApplication.run(SecurityApplication.class, args);
	}

}
