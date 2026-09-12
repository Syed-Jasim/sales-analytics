package com.jasim.sales_analytics.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jasim.sales_analytics.dto.CategoryDTO;
import com.jasim.sales_analytics.entity.Category;
import com.jasim.sales_analytics.exception.CategoryNotFoundException;
import com.jasim.sales_analytics.mapper.CategoryMapper;
import com.jasim.sales_analytics.repository.CategoryRepository;

@Service 
public class CategoryService {

    private final CategoryRepository categoryRepository;

    private CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public CategoryDTO createCategoty(CategoryDTO dto){
        Category category = CategoryMapper.toEntity(dto);
        Category savedCategory = categoryRepository.save(category);
        return CategoryMapper.toDto(savedCategory);
    }

    public List<CategoryDTO> getAllCategories(){
        List<Category> categories = categoryRepository.findAll();
        ArrayList<CategoryDTO> categoryDTOs = new ArrayList<>();
        for(Category category : categories){
            categoryDTOs.add(CategoryMapper.toDto(category));
        }
        return categoryDTOs;
    }

    public CategoryDTO getCategoryById(Long id){
        Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new CategoryNotFoundException(
            "Category with id " + id + " not found"
        ));
        return CategoryMapper.toDto(category);
    }

    public CategoryDTO updateCategoty(Long id, CategoryDTO categoryDTO){
        Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new CategoryNotFoundException(
            "Category with id " + id + " not found"
        ));

        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        categoryRepository.save(category);

        return CategoryMapper.toDto(category);
    }

    public void deleteCategory(Long id){
        Category category = categoryRepository.findById(id).orElseThrow(
            () -> new CategoryNotFoundException(
                "Category with id " + id + " not found"
            ));
        categoryRepository.delete(category);
    }
}
