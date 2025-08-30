package com.baniyamart.backend.service.impl;

import com.baniyamart.backend.service.PaymentProvider;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PayUPaymentProvider implements PaymentProvider {

    @Override
    public void acceptPayment() {
        // PayU payment processing logic
        System.out.println("Processing payment through PayU...");
        log.info("Accepting payment using PayU");
        // Add logging if necessary
    }

}
