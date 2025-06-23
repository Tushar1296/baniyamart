package com.baniyamart.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baniyamart.backend.exception.CategoryNotFoundException;
import com.baniyamart.backend.model.Category;
import com.baniyamart.backend.repository.CategoryRepository;
import com.baniyamart.backend.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(Category category) {
        category.setId(UUID.randomUUID().toString()); // Assign custom UUID
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(String id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    }

    @Override
    public Category updateCategory(String id, Category updatedCategory) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category category = existingCategory.get();
            category.setName(updatedCategory.getName());
            category.setIcon(updatedCategory.getIcon());
            category.setUpdatedAt(LocalDateTime.now());

            return categoryRepository.save(category);
        } else {
            throw new CategoryNotFoundException("Category not found with ID: " + id);
        }
    }

    @Override
    public void deleteCategory(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException("Category not found with ID: " + id);
        }
        categoryRepository.deleteById(id);
    }

}
