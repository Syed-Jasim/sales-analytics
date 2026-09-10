package com.jasim.sales_analytics.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jasim.sales_analytics.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
    
}
