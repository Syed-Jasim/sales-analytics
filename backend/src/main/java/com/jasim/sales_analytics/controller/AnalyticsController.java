package com.jasim.sales_analytics.controller;

import com.jasim.sales_analytics.dto.CategorySalesDTO;
import com.jasim.sales_analytics.dto.CustomerSalesDTO;
import com.jasim.sales_analytics.dto.DashboardSummaryDTO;
import com.jasim.sales_analytics.dto.SalesByDateDTO;
import com.jasim.sales_analytics.dto.TopProductDTO;
import com.jasim.sales_analytics.service.AnalyticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/revenue")
    public BigDecimal getTotalRevenue() {
        return analyticsService.getTotalRevenue();
    }

    @GetMapping("/orders")
    public Long getTotalOrders() {
        return analyticsService.getTotalOrders();
    }

    @GetMapping("/products-sold")
    public Long getTotalProductsSold() {
        return analyticsService.getTotalProductsSold();
    }

    @GetMapping("/top-products")
    public List<TopProductDTO> getTopSellingProducts() {
        return analyticsService.getTopSellingProducts();
    }

    @GetMapping("/sales-by-category")
    public List<CategorySalesDTO> getSalesByCategory() {
        return analyticsService.getSalesByCategory();
    }

    @GetMapping("/sales-by-date")
    public List<SalesByDateDTO> getSalesByDate(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to) {

        return analyticsService.getSalesByDate(from, to);
    }

    @GetMapping("/summary")
    public DashboardSummaryDTO getDashboardSummary(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to) {

        return analyticsService.getDashboardSummary(from, to);
    }

    @GetMapping("/sales-by-customer")
    public List<CustomerSalesDTO> getSalesByCustomer(
            @RequestParam LocalDate from,
            @RequestParam LocalDate to) {

        return analyticsService.getSalesByCustomer(from, to);
    }
}