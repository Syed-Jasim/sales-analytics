package com.jasim.sales_analytics.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jasim.sales_analytics.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
