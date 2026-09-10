package com.jasim.sales_analytics.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jasim.sales_analytics.dto.CategorySalesDTO;
import com.jasim.sales_analytics.dto.CustomerSalesDTO;
import com.jasim.sales_analytics.dto.SalesByDateDTO;
import com.jasim.sales_analytics.dto.TopProductDTO;
import com.jasim.sales_analytics.entity.Sale;

public interface AnalyticsRepository extends JpaRepository<Sale, Long> {
    @Query("SELECT COALESCE(SUM(s.totalAmount), 0) FROM Sale s")
    BigDecimal getTotalRevenue();

    @Query("SELECT COUNT(s) FROM Sale s")
    Long getTotalOrders();

    @Query("SELECT COALESCE(SUM(si.quantity), 0) FROM SaleItem si")
    Long getTotalProductsSold();

    @Query("""
                SELECT new com.jasim.sales_analytics.dto.TopProductDTO(
                    si.product.id,
                    si.product.name,
                    SUM(si.quantity)
                )
                FROM SaleItem si
                GROUP BY si.product.id, si.product.name
                ORDER BY SUM(si.quantity) DESC
            """)
    List<TopProductDTO> getTopSellingProducts();

    @Query("""
                SELECT new com.jasim.sales_analytics.dto.CategorySalesDTO(
                    si.product.category.name,
                    SUM(si.subtotal)
                )
                FROM SaleItem si
                GROUP BY si.product.category.id, si.product.category.name
                ORDER BY SUM(si.subtotal) DESC
            """)
    List<CategorySalesDTO> getSalesByCategory();

    @Query("""
                SELECT new com.jasim.sales_analytics.dto.SalesByDateDTO(
                    CAST(s.saleDate AS LocalDate),
                    SUM(s.totalAmount)
                )
                FROM Sale s
                WHERE s.saleDate >= :fromDate
                  AND s.saleDate < :toDate
                GROUP BY CAST(s.saleDate AS LocalDate)
                ORDER BY CAST(s.saleDate AS LocalDate)
            """)
    List<SalesByDateDTO> getSalesByDate(
            LocalDateTime fromDate,
            LocalDateTime toDate);

    @Query("""
                SELECT COALESCE(SUM(s.totalAmount), 0)
                FROM Sale s
                WHERE s.saleDate >= :fromDate
                  AND s.saleDate < :toDate
            """)
    BigDecimal getTotalRevenue(
            LocalDateTime fromDate,
            LocalDateTime toDate);

    @Query("""
                SELECT COUNT(s)
                FROM Sale s
                WHERE s.saleDate >= :fromDate
                  AND s.saleDate < :toDate
            """)
    Long getTotalOrders(
            LocalDateTime fromDate,
            LocalDateTime toDate);

    @Query("""
                SELECT COALESCE(SUM(si.quantity), 0)
                FROM SaleItem si
                WHERE si.sale.saleDate >= :fromDate
                  AND si.sale.saleDate < :toDate
            """)
    Long getTotalProductsSold(
            LocalDateTime fromDate,
            LocalDateTime toDate);

    @Query("""
                SELECT new com.jasim.sales_analytics.dto.CustomerSalesDTO(
                    s.customer.id,
                    s.customer.name,
                    COUNT(s),
                    SUM(s.totalAmount)
                )
                FROM Sale s
                WHERE s.saleDate >= :fromDate
                  AND s.saleDate < :toDate
                GROUP BY s.customer.id, s.customer.name
                ORDER BY SUM(s.totalAmount) DESC
            """)
    List<CustomerSalesDTO> getSalesByCustomer(
            LocalDateTime fromDate,
            LocalDateTime toDate);
}
