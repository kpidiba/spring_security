# SPRING SECURITY

- youtubeur :**bouli ali**

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
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId> <!-- or jjwt-gson if Gson is preferred -->
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
```

## USE TOKEN IN REQUEST INSOMNIA

- go to header ,first input Authorization ,second section "Bearer $token"