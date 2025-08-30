package com.baniyamart.backend.service.impl;

import org.springframework.stereotype.Service;
import com.baniyamart.backend.service.PaymentProvider;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StripePaymentProvider implements PaymentProvider {

    @Override
    public void acceptPayment() {
        // Stripe payment processing logic
        System.out.println("Processing payment through Stripe...");
        log.info("Accepting payment using Stripe");
    }

}
