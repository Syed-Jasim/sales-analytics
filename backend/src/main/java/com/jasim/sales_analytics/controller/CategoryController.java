package com.jasim.sales_analytics.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jasim.sales_analytics.dto.CategoryDTO;
import com.jasim.sales_analytics.service.CategoryService;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping ("/api/categories")
public class CategoryController {
    
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping
    public CategoryDTO createCategory(@RequestBody CategoryDTO dto){
        return categoryService.createCategoty(dto);
    }

    @GetMapping
    public List<CategoryDTO> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryDTO getCategoryById(@PathVariable Long id){
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    public CategoryDTO updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO){
        return categoryService.updateCategoty(id, categoryDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }
}
