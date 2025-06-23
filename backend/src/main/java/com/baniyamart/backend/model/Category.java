package com.baniyamart.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(of = "id") // Identity based on Mongo ID
@Document(collection = "categories")
public class Category {
     @Id
    private String id;

    private String name;
    private String icon; // Use this for an icon class or emoji string or small image URL
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
