package com.jasim.sales_analytics.dto;

import java.math.BigDecimal;

public class DashboardSummaryDTO {

    private BigDecimal totalRevenue;
    private Long totalOrders;
    private Long totalProductsSold;

    public DashboardSummaryDTO() {
    }

    public DashboardSummaryDTO(BigDecimal totalRevenue, Long totalOrders, Long totalProductsSold) {
        this.totalRevenue = totalRevenue;
        this.totalOrders = totalOrders;
        this.totalProductsSold = totalProductsSold;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public Long getTotalProductsSold() {
        return totalProductsSold;
    }

    public void setTotalProductsSold(Long totalProductsSold) {
        this.totalProductsSold = totalProductsSold;
    }
}