package com.jasim.sales_analytics.mapper;

import com.jasim.sales_analytics.dto.CategoryDTO;
import com.jasim.sales_analytics.entity.Category;

public class CategoryMapper {
    
    public static CategoryDTO toDto(Category category){
        return new CategoryDTO(
            category.getId(),
            category.getName(),
            category.getDescription()
        );
    }

    public static Category toEntity(CategoryDTO dto){
        Category category = new Category();
        category.setId(dto.getId());
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());

        return category;
    }
}
