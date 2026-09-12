package com.jasim.sales_analytics.controller;

import com.jasim.sales_analytics.dto.SaleDTO;
import com.jasim.sales_analytics.service.SaleService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public SaleDTO createSale(@RequestBody SaleDTO dto) {
        return saleService.createSale(dto);
    }

    @GetMapping
    public List<SaleDTO> getAllSales() {
        return saleService.getAllSales();
    }

    @GetMapping("/{id}")
    public SaleDTO getSaleById(@PathVariable Long id) {
        return saleService.getSaleById(id);
    }
}