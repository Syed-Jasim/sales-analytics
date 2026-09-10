package com.jasim.sales_analytics.mapper;

import java.util.ArrayList;
import java.util.List;

import com.jasim.sales_analytics.dto.SaleDTO;
import com.jasim.sales_analytics.dto.SaleItemDTO;
import com.jasim.sales_analytics.entity.Sale;
import com.jasim.sales_analytics.entity.SaleItem;

public class SaleMapper {
    public static SaleDTO toDto(Sale sale){
        List<SaleItemDTO> saleItemDTOs = new ArrayList<>();
        for(SaleItem saleItem : sale.getSaleItems()){
            Long productId = null;

            if(saleItem.getProduct() != null){
                productId = saleItem.getProduct().getId();
            }

            SaleItemDTO saleItemDTO = new SaleItemDTO(
                saleItem.getId(),
                productId,
                saleItem.getQuantity(),
                saleItem.getUnitPrice(),
                saleItem.getSubtotal()
            );

            saleItemDTOs.add(saleItemDTO);
        }

        Long customerId = null;

        if(sale.getCustomer() != null){
            customerId = sale.getCustomer().getId();
        }

        return new SaleDTO(
            sale.getId(),
            customerId,
            sale.getSaleDate(),
            sale.getTotalAmount(),
            saleItemDTOs
        );
    }
}
