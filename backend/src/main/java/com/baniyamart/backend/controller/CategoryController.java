package com.baniyamart.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.baniyamart.backend.model.Category;
import com.baniyamart.backend.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")  // Allow frontend access (later restrict by domain)
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    // Create a category
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    // Get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // Get Category By ID
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id){
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }


    // Update a Category
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody Category category){
        return ResponseEntity.ok(categoryService.updateCategory(id, category));
    }

    // Delete a category
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id){
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
