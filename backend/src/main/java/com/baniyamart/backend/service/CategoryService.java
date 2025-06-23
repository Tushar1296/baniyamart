package com.baniyamart.backend.service;

import java.util.List;

import com.baniyamart.backend.model.Category;

public interface CategoryService {

    Category createCategory(Category category);

    List<Category> getAllCategories();

    Category getCategoryById(String id);

    Category updateCategory(String id, Category category);

    void deleteCategory(String id);
}
