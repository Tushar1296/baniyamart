package com.baniyamart.backend.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.baniyamart.backend.model.enums.OrderStatus;

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
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String userId;
    private List<OrderItem> items;
    private BigDecimal totalAmount;
    private OrderStatus Status;

    private String paymentMethod; // e.g., "cod", "paypal", "stripe"

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private String customerCity;
    private String customerPincode;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
