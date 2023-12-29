# Java Spring Boot and Angular Project -  APIs with Spring Security and JWT

## Table of Contents

- Introduction
- Features
- Requirements
- Setup Instructions
- Usage

## Introduction

This repository contains a Java Spring Boot and Angular 
project that implements simple signup and login APIs with Spring 
Security and JWT (JSON Web Tokens). The project aims to demonstrate how 
to build a secure authentication system using Spring Boot for the 
backend and Angular for the frontend.

The backend is developed with Java Spring Boot, which 
provides robust security features through Spring Security, and the 
frontend is built with Angular, providing a user-friendly interface to 
interact with the signup and login APIs.

## Features

- User signup with email and password
- User login with email and password
- JWT-based authentication for secure API access
- Token-based session management

## Requirements

Before running the project, ensure you have the following prerequisites:

- Java Development Kit (JDK) 8 or higher
- Node.js and npm (Node Package Manager)
- Angular CLI (Command Line Interface)

## Setup Instructions

1. **Clone the repository:** Start by cloning this repository to your local machine using Git.

```shell
git clone https://github.com/kpidiba/spring_security
cd spring-boot-angular-auth
```

- **Backend Setup:**
  
  - Open the backend project in your preferred Java IDE (Eclipse, IntelliJ, etc.).
  - Configure your database settings in `src/main/resources/application.properties`.
  - Run the Spring Boot application to start the backend server.

- **Frontend Setup:**
  
  - Navigate to the `Client FE` folder.
  - Install the required dependencies by running:
  
  ```shell
  npm install
  ```

- - Update the API base URL in `src/environments/environment.ts` to match your backend server URL.

- **Running the Application:**
  
  - To start the Angular development server, run:
  
  ```shell
  ng serve
  ```
2. - Visit `http://localhost:4200` in your web browser to access the application.

## Usage

1. **Signup:**
   
   - Open the application in your web browser and click on the "Sign Up" button.
   - Enter your email address and password, then click "Register."
   - Upon successful registration, you will be redirected to the login page.

2. **Login:**
   
   - On the login page, enter your registered email address and password.
   - Click on the "Login" button.
   - If the provided credentials are correct, you will be redirected to the dashboard.

3. **Dashboard:**
   
   - The dashboard displays a welcome message and other user-specific information.
   - The dashboard makes authenticated API requests to the backend using JWT.

## Contributing

Contributions to this project are welcome! If you find any
 issues or have suggestions for improvements, please open an issue or 
submit a pull request.

When contributing, please follow the existing code style, and provide detailed information about your changes or additions.

### DEPENDENCIES

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.1.0</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.security</groupId>
	<artifactId>test</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>test</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>com.mysql</groupId>
			<artifactId>mysql-connector-j</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-jackson</artifactId>
			<version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-impl</artifactId>
			<version>0.11.5</version>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt-api</artifactId>
			<version>0.11.5</version>
		</dependency>

		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<scope>annotationProcessor</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>


```
