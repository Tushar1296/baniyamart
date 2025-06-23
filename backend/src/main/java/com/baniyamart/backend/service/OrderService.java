package com.baniyamart.backend.service;

import java.util.List;
import java.util.Optional;

import com.baniyamart.backend.model.Order;

public interface OrderService {

    Order createOrder(Order order);

    List<Order> getAllOrders();

    Optional<Order> getOrderById(String id);

    List<Order> getOrdersByUserId(String userId);

    Order updateOrderStatus(String id, String status); // We'll validate enum in impl

    void deleteOrder(String id);

}
