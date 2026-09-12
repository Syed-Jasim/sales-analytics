package com.jasim.sales_analytics.dto;

import java.math.BigDecimal;

public class CategorySalesDTO {

    private String categoryName;
    private BigDecimal revenue;

    public CategorySalesDTO() {
    }

    public CategorySalesDTO(String categoryName, BigDecimal revenue) {
        this.categoryName = categoryName;
        this.revenue = revenue;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }
}