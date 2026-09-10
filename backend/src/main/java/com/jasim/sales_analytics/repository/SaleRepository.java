package com.jasim.sales_analytics.repository;

import com.jasim.sales_analytics.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}