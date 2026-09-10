package com.jasim.sales_analytics.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jasim.sales_analytics.dto.CategorySalesDTO;
import com.jasim.sales_analytics.dto.CustomerSalesDTO;
import com.jasim.sales_analytics.dto.DashboardSummaryDTO;
import com.jasim.sales_analytics.dto.SalesByDateDTO;
import com.jasim.sales_analytics.dto.TopProductDTO;
import com.jasim.sales_analytics.repository.AnalyticsRepository;

@Service
public class AnalyticsService {
    public final AnalyticsRepository analyticsRepository;

    public AnalyticsService(AnalyticsRepository analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }

    public BigDecimal getTotalRevenue() {
        return analyticsRepository.getTotalRevenue();
    }

    public Long getTotalOrders() {
        return analyticsRepository.getTotalOrders();
    }

    public Long getTotalProductsSold() {
        return analyticsRepository.getTotalProductsSold();
    }

    public List<TopProductDTO> getTopSellingProducts() {
        return analyticsRepository.getTopSellingProducts();
    }

    public List<CategorySalesDTO> getSalesByCategory() {
        return analyticsRepository.getSalesByCategory();
    }

    public List<SalesByDateDTO> getSalesByDate(LocalDate from, LocalDate to) {

        LocalDateTime fromDate = from.atStartOfDay();
        LocalDateTime toDate = to.plusDays(1).atStartOfDay();

        return analyticsRepository.getSalesByDate(fromDate, toDate);
    }

    public DashboardSummaryDTO getDashboardSummary() {

        BigDecimal totalRevenue = analyticsRepository.getTotalRevenue();

        Long totalOrders = analyticsRepository.getTotalOrders();

        Long totalProductsSold = analyticsRepository.getTotalProductsSold();

        return new DashboardSummaryDTO(
                totalRevenue,
                totalOrders,
                totalProductsSold);
    }

    public DashboardSummaryDTO getDashboardSummary(
            LocalDate from,
            LocalDate to) {

        LocalDateTime fromDate = from.atStartOfDay();
        LocalDateTime toDate = to.plusDays(1).atStartOfDay();

        BigDecimal totalRevenue = analyticsRepository.getTotalRevenue(fromDate, toDate);

        Long totalOrders = analyticsRepository.getTotalOrders(fromDate, toDate);

        Long totalProductsSold = analyticsRepository.getTotalProductsSold(fromDate, toDate);

        return new DashboardSummaryDTO(
                totalRevenue,
                totalOrders,
                totalProductsSold);
    }

    public List<CustomerSalesDTO> getSalesByCustomer(
            LocalDate from,
            LocalDate to) {

        LocalDateTime fromDate = from.atStartOfDay();
        LocalDateTime toDate = to.plusDays(1).atStartOfDay();

        return analyticsRepository.getSalesByCustomer(fromDate, toDate);
    }
}
