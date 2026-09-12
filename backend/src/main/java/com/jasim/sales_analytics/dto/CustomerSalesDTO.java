package com.jasim.sales_analytics.dto;

import java.math.BigDecimal;

public class CustomerSalesDTO {

    private Long customerId;
    private String customerName;
    private Long totalOrders;
    private BigDecimal totalRevenue;

    public CustomerSalesDTO() {
    }

    public CustomerSalesDTO(Long customerId,
                            String customerName,
                            Long totalOrders,
                            BigDecimal totalRevenue) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}