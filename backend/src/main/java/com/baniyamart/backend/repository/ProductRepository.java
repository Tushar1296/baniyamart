package com.baniyamart.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.baniyamart.backend.model.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    // Custom finders if needed
    List<Product> findByCategoryId(String categoryId);
    List<Product> findByFeaturedTrue();
    List<Product> findByNameContainingIgnoreCase(String keyword);
}
