package com.baniyamart.backend.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderItem {

    private String productId;
    private String productName;
    private int quantity;
    private BigDecimal pricePerUnit;
    private BigDecimal totalPrice;

    public OrderItem(String productId, String productName, int quantity, BigDecimal pricePerUnit) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.totalPrice = pricePerUnit.multiply(BigDecimal.valueOf(quantity));
    }
}
