package com.baniyamart.backend.service.impl;

import com.baniyamart.backend.service.PaymentProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PayPalPaymentProvider implements PaymentProvider {

    @Override
    public void acceptPayment() {
        // PayPal payment processing logic
        System.out.println("Processing payment through PayPal...");
        log.info("Accepting payment using PayPal");
    }

}
