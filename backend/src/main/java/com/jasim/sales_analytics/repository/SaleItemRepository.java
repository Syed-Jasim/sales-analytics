package com.jasim.sales_analytics.repository;

import com.jasim.sales_analytics.entity.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
}