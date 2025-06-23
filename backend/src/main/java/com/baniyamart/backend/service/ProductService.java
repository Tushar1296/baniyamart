package com.baniyamart.backend.service;

import java.util.List;
import java.util.Optional;

import com.baniyamart.backend.model.Product;

public interface ProductService {

    Product createProduct(Product product);

    List<Product> getAllProducts();

    Optional<Product> getProductById(String id);

    List<Product> getProductsByCategory(String categoryId);

    List<Product> getFeatureProducts();

    Product updateProduct(String id, Product updateProduct);

    void deleteProduct(String id);
}
