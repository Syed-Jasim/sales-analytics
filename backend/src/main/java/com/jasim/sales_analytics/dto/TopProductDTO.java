package com.jasim.sales_analytics.dto;

public class TopProductDTO {
    private Long productId;
    private String productName;
    private Long quantitySold;

    public TopProductDTO(){}

    public TopProductDTO(Long productId, String productName, Long quantitySold) {
        this.productId = productId;
        this.productName = productName;
        this.quantitySold = quantitySold;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(Long quantitySold) {
        this.quantitySold = quantitySold;
    }
}
