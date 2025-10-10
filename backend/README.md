# Backend - Spring Boot + Maven + H2 Database

This is a Spring Boot application built with Java 17, Maven, and H2 in-memory database.

## Tech Stack

- **Framework**: Spring Boot 3.4.1
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: H2 (in-memory)
- **ORM**: Spring Data JPA / Hibernate

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Installation

No additional installation needed. Maven will download all dependencies automatically.

### Running the Application

```bash
cd backend
mvn spring-boot:run
```

The application will start at `http://localhost:8080`

### Building the Application

Build the project:

```bash
mvn clean package
```

Run the built JAR:

```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### Running Tests

Run all tests:

```bash
mvn test
```

## H2 Database Configuration

The application uses an in-memory H2 database. Configuration details:

- **URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (empty)
- **Console**: Available at `http://localhost:8080/h2-console` when the app is running

To access the H2 console:
1. Start the application
2. Navigate to `http://localhost:8080/h2-console`
3. Use the connection details above to connect

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/backend/
│   │   │       └── BackendApplication.java    # Main Spring Boot application
│   │   └── resources/
│   │       └── application.properties         # Application configuration
│   └── test/
│       └── java/
│           └── com/example/backend/
│               └── BackendApplicationTests.java  # Test class
├── pom.xml              # Maven configuration and dependencies
└── README.md            # This file
```

## Configuration

The database and JPA settings are configured in `src/main/resources/application.properties`:

```properties
# H2 Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

## Adding Entities and Repositories

To create a JPA entity:

```java
package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    // Getters and setters
}
```

To create a repository:

```java
package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
```

## Creating REST Controllers

To create a REST controller:

```java
package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}
```
