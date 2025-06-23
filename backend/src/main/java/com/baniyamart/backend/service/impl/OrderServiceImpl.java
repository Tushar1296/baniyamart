package com.baniyamart.backend.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baniyamart.backend.exception.InvalidOrderStatusException;
import com.baniyamart.backend.exception.OrderNotFoundException;
import com.baniyamart.backend.model.Order;
import com.baniyamart.backend.model.enums.OrderStatus;
import com.baniyamart.backend.repository.OrderRepository;
import com.baniyamart.backend.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order createOrder(Order order) {
        order.setId(UUID.randomUUID().toString());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        // Calculate total amount
        BigDecimal total = order.getItems().stream()
                .map(item -> item.getTotalPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order updateOrderStatus(String id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("order not found with ID: " + id));

        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            order.setStatus(orderStatus);
        } catch (IllegalArgumentException e) {
            throw new InvalidOrderStatusException("Invalid order status: " + status);
        }

        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id)) {
            throw new OrderNotFoundException("Order not found with ID: " + id);
        }
        orderRepository.deleteById(id);
    }

}
