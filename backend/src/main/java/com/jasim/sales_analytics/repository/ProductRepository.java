package com.jasim.sales_analytics.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jasim.sales_analytics.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
    
}
