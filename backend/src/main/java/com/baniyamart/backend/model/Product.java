package com.baniyamart.backend.model;

import java.math.BigDecimal;
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
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    private String name;
    private String description;
    private BigDecimal price;

    private String categoryId; // link with Category ID
    private String imageUrl;
    
    private int quantity;       // Stock count
    private boolean featured; // For homepage promotion

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public Product(String name, String description, BigDecimal price, String categoryId, int quantity, String imageUrl, boolean featured) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.featured = featured;
        
    }
    
    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

}
