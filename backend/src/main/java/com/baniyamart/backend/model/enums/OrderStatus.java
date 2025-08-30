package com.baniyamart.backend.model.enums;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum OrderStatus {

    PENDING,
    PLACED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    CANCELLED;

    @JsonCreator
    public static OrderStatus fromValue(String value) {
        return Arrays.stream(values())
            .filter(e -> e.name().equalsIgnoreCase(value))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("Invalid status: " + value));
    }
}
