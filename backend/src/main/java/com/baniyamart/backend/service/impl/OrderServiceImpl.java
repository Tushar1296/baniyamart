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
import com.baniyamart.backend.model.OrderItem;
import com.baniyamart.backend.model.enums.OrderStatus;
import com.baniyamart.backend.repository.OrderRepository;
import com.baniyamart.backend.service.EmailService;
import com.baniyamart.backend.service.OrderService;
import com.baniyamart.backend.service.PaymentProvider;

@Service
public class OrderServiceImpl implements OrderService {

    private final PaymentProviderFactory paymentProviderFactory;
    private final OrderRepository orderRepository;
    private final EmailService emailService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, EmailService emailService,
            PaymentProviderFactory paymentProviderFactory) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.paymentProviderFactory = paymentProviderFactory;
    }

    @Override
    public Order createOrder(Order order) {
        order.setId(UUID.randomUUID().toString());
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        BigDecimal cartTotal = BigDecimal.ZERO;

        System.out.println("🔍 Calculating total for " + order.getItems().size() + " items");

        for (OrderItem item : order.getItems()) {
            cartTotal = cartTotal.add(item.getTotalPrice());
            System.out.println(
                    "   - " + item.getProductName() + " x" + item.getQuantity() + " = " + item.getTotalPrice());
        }
        BigDecimal deliveryFee = cartTotal.compareTo(BigDecimal.valueOf(199)) > 0 ? BigDecimal.ZERO
                : BigDecimal.valueOf(50);
        order.setTotalAmount(cartTotal.add(deliveryFee));
        System.out.println("💰 Total amount for order " + order.getId() + " is " + order.getTotalAmount());
        Order savedOrder = orderRepository.save(order);

        // Process payment
        if (!"cod".equalsIgnoreCase(order.getPaymentMethod())) {
            PaymentProvider paymentProvider = paymentProviderFactory.getPaymentProvider(order.getPaymentMethod());
            paymentProvider.acceptPayment();
        }

        // Send email with correct total
        if (savedOrder.getCustomerEmail() != null) {
            emailService.sendOrderConfirmation(savedOrder);
        }

        return savedOrder;
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
