package com.baniyamart.backend.repository;

import com.baniyamart.backend.model.Order;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    // Custom: Get all orders for a specific user
    List<Order> findByUserId(String userId);

    // Optional: Find by status
    List<Order> findByStatus(String status);
}
