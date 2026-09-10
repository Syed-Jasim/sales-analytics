package com.jasim.sales_analytics.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jasim.sales_analytics.dto.ProductDTO;
import com.jasim.sales_analytics.entity.Category;
import com.jasim.sales_analytics.entity.Product;
import com.jasim.sales_analytics.exception.CategoryNotFoundException;
import com.jasim.sales_analytics.exception.ProductNotFoundException;
import com.jasim.sales_analytics.mapper.ProductMapper;
import com.jasim.sales_analytics.repository.CategoryRepository;
import com.jasim.sales_analytics.repository.ProductRepository;

@Service 
public class ProductService {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository){
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductDTO createProduct(ProductDTO dto){
        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(
            () -> new CategoryNotFoundException("Category with id " + dto.getCategoryId() + " not found"
        ));

        Product product = ProductMapper.toEntity(dto, category);

        productRepository.save(product);

        return ProductMapper.toDto(product);
    }

    public List<ProductDTO> getAllProducts(){
        List<Product> products = productRepository.findAll();
        ArrayList<ProductDTO> productDTOs = new ArrayList<>();

        for(Product product : products){
            productDTOs.add(ProductMapper.toDto(product));
        }

        return productDTOs;
    }

    public ProductDTO getProductById(Long id){
        Product product = productRepository.findById(id).orElseThrow(
            () -> new ProductNotFoundException("Product with id " + id + " nort found"
        ));
        return ProductMapper.toDto(product);
    }

    public ProductDTO updateProduct(Long id, ProductDTO dto){
        Product product = productRepository.findById(id).orElseThrow(
            () -> new ProductNotFoundException("Product with id " + id + " not found"
        ));

        Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(
            () -> new CategoryNotFoundException("Categoty with id " + id + " not found"
        ));

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setPrice(dto.getPrice());
        product.setStockQuantity(dto.getStockQuantity());
        product.setActive(dto.getActive());
        product.setCategory(category);

        productRepository.save(product);
        return ProductMapper.toDto(product);
    }

    public void deleteProduct(Long id){
        Product product = productRepository.findById(id).orElseThrow(
            () -> new ProductNotFoundException(
                "Product with id " + id + " not found"
        ));

        productRepository.delete(product);
    }

}
