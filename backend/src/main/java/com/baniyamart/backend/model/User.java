package com.baniyamart.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "id")
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String phone;
    private String address;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
