package com.baniyamart.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import java.math.BigDecimal;
import com.baniyamart.backend.model.Order;
import com.baniyamart.backend.model.OrderItem;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOrderConfirmation(Order order) {
        log.info("Preparing to send order confirmation email for Order ID: {}", order.getId());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(order.getCustomerEmail());
        message.setSubject("BaniyaMart - Order Confirmation #" + order.getId().substring(0, 8));

        // Build detailed email content
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Dear ").append(order.getCustomerName()).append(",\n\n");
        emailBody.append("Thank you for your order! Here are your order details:\n\n");
        emailBody.append("ORDER SUMMARY\n");
        emailBody.append("=============\n");
        emailBody.append("Order ID: ").append(order.getId()).append("\n\n");

        for (OrderItem item : order.getItems()) {
            System.out.println("OrderItem: " + item.getProductId() + " - " + item.getProductName());
        }

        // List all items
        BigDecimal subtotal = BigDecimal.ZERO;
        emailBody.append("ITEMS ORDERED:\n");
        for (Object itemObj : order.getItems()) {
            OrderItem item = (OrderItem) itemObj;
            BigDecimal itemTotal = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            subtotal = subtotal.add(itemTotal);

            emailBody.append("• ").append(item.getProductName())
                    .append(" x").append(item.getQuantity())
                    .append(" @ ₹").append(item.getPrice())
                    .append(" = ₹").append(itemTotal).append("\n");
        }

        // Order totals
        emailBody.append("\n");
        emailBody.append("Subtotal: ₹").append(subtotal).append("\n");
        if (subtotal.compareTo(new BigDecimal("199")) > 0) {
            emailBody.append("Delivery: ₹0\n");
        } else {
            emailBody.append("Delivery: ₹50\n");
        }
        emailBody.append("TOTAL: ₹").append(order.getTotalAmount()).append("\n\n");

        // Shipping details
        emailBody.append("DELIVERY ADDRESS:\n");
        emailBody.append(order.getCustomerName()).append("\n");
        emailBody.append(order.getCustomerAddress()).append("\n");
        emailBody.append(order.getCustomerCity()).append(" - ").append(order.getCustomerPincode()).append("\n");
        emailBody.append("Phone: ").append(order.getCustomerPhone()).append("\n\n");

        // Footer
        emailBody.append("Your order will be delivered within 1 hours.\n");
        emailBody.append("Track your order or contact us at support@baniyamart.com\n\n");
        emailBody.append("Best regards,\n");
        emailBody.append("BaniyaMart Team");

        message.setText(emailBody.toString());
        mailSender.send(message);
    }
}