package com.jasim.sales_analytics.mapper;

import com.jasim.sales_analytics.dto.ProductDTO;
import com.jasim.sales_analytics.entity.Category;
import com.jasim.sales_analytics.entity.Product;

public class ProductMapper {

    public static ProductDTO toDto(Product product) {

        Long categoryId = null;

        if (product != null && product.getCategory() != null) {
            categoryId = product.getCategory().getId();
        }

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getSku(),
                product.getPrice(),
                product.getStockQuantity(),
                product.getActive(),
                categoryId
        );
    }

    public static Product toEntity(ProductDTO dto, Category category) {

        Product product = new Product();

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setPrice(dto.getPrice());
        product.setStockQuantity(dto.getStockQuantity());
        product.setActive(dto.getActive());
        product.setCategory(category);

        return product;
    }
}