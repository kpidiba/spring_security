# SPRING SECURITY

### SOURCES

- youtubeur : **bouli ali**
- https://spring.io/guides/gs/securing-web 

### ENDPOINTS

1. **Authentication** 
   
   - **POST METHOD**
   - **http://localhost:8080/api/v1/auth/login** : send json data in this format 
   
   ```json
   {
       "username" :"david",
       "password" : "1234"
   }
   ```
   
   - **POST METHOD**
   - **http://localhost:8080/api/v1/auth/register** : send json data in this format
   
   ```json
   {
       "username" :"david",
       "password" : "1234",
       "role": "ADMIN"
   }
   ```

2. **Refresh-Token**
   
   - **POST METHOD**
   - **http://localhost:8080/api/v1/auth/refresh-token** 
   - Put the **bearer token**

3. **Logout**
   
   - **POST METHOD**
   - **http://localhost:8080/api/v1/auth/logout**
   - Put the **bearer token**

4. **Test** 
   
   - **http://localhost:8080/api/v1/admin**
   - **METHODS(GET,POST,PUT,DELETE)**

## FEATURES

#### Feature 1: Authentication

- Implement authentication using Spring Security.
- Configure authentication providers, such as in-memory, JDBC.
- Define authentication mechanisms like form-based login, register, HTTP Basic.
- Customize authentication success and failure handlers.

#### Feature 2:Role Base Authentication

- Define user roles and authorities.
- Configure role-based access control (RBAC) using Spring Security.
- Secure endpoints based on user roles using annotations or configuration.
- Implement role hierarchy if needed.

#### Feautre 3: Refresh Token

- Implement refresh token functionality using Spring Security
- Configure token stores and token services for refresh tokens.
- Define token endpoints for token refresh.
- Handle token expiration gracefully and automatically refresh tokens when necessary.

## Bugs or Future improvement ideas

- Update Angular UI front

- Refresh Token Front-End

### EXPLAINS BASIC

Spring provides 5 core concepts which should be known to a developer.

1. Authentication
2. Authorization
3. Principal
4. Granted Authority
5. Roles.

**Authentication**: Who is the user?

**Authorization**: Are they allowed to do this?

**Principal**: Currently Logged in User/Account.

**Refresh Token:** 

**Granted Authority**: Permission or a privilege granted to a user within an application.

**Roles**: Roles are a way to group together related granted authorities into higher-level categories.

Now that we know some basic stuff about security , lets start creating a simple API where we are going to use spring security.

### DEPENDENCIES

- **LOMBOOK**

- **SPRING SECURITY**

- **MYSQL CONNECTOR**

- **JPA**

- **SPRING WEB**

```xml
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
```

## USE TOKEN IN REQUEST INSOMNIA

- go to header ,first input Authorization ,second section "Bearer $token"

Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

When contributing, please follow the existing code style, and provide detailed information about your changes or additions.