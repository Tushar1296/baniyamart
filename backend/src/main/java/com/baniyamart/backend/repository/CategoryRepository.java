package com.baniyamart.backend.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.baniyamart.backend.model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    List<Category> findByNameContaining(String name);

    List<Category> findByNameContainingIgnoreCase(String name);

}
