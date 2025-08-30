package com.baniyamart.backend.service.impl;

import org.springframework.stereotype.Service;

import java.util.Map;

import com.baniyamart.backend.service.PaymentProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentProviderFactory {

    private final Map<String, PaymentProvider> paymentProviderMap;

    // public PaymentProviderFactory(Map<String, PaymentProvider> providers) {
    // this.providers = providers;
    // }

    public PaymentProvider getPaymentProvider(String paymentMethod) {
        String beanName = mapToProviderBeanName(paymentMethod);
        PaymentProvider provider = paymentProviderMap.get(beanName);
        if (provider == null) {
            throw new IllegalArgumentException("Unsupported payment provider: " + paymentMethod);
        }
        return provider;
    }

    private String mapToProviderBeanName(String paymentType) {
        switch (paymentType.toLowerCase()) {
            case "paypal":
                return "payPalPaymentProvider";
            case "stripe":
                return "stripePaymentProvider";
            case "payu":
                return "payUPaymentProvider";
            default:
                return null;
        }
    }

}
