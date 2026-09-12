package com.jasim.sales_analytics.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jasim.sales_analytics.dto.SaleDTO;
import com.jasim.sales_analytics.dto.SaleItemDTO;
import com.jasim.sales_analytics.entity.Customer;
import com.jasim.sales_analytics.entity.Product;
import com.jasim.sales_analytics.entity.Sale;
import com.jasim.sales_analytics.entity.SaleItem;
import com.jasim.sales_analytics.exception.CustomerNotFoundException;
import com.jasim.sales_analytics.exception.InsufficientStockException;
import com.jasim.sales_analytics.exception.ProductNotFoundException;
import com.jasim.sales_analytics.exception.SaleNotFoundException;
import com.jasim.sales_analytics.mapper.SaleMapper;
import com.jasim.sales_analytics.repository.CustomerRepository;
import com.jasim.sales_analytics.repository.ProductRepository;
import com.jasim.sales_analytics.repository.SaleRepository;

import jakarta.transaction.Transactional;

@Service 
public class SaleService {
    private final SaleRepository saleRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public SaleService(SaleRepository saleRepository, CustomerRepository customerRepository, ProductRepository productRepository){
        this.saleRepository = saleRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public SaleDTO createSale(SaleDTO dto){

        //1. Find the customer
        Customer customer = customerRepository.findById(dto.getCustomerId()).orElseThrow(
            () -> new CustomerNotFoundException(
                "Customer with id " + dto.getCustomerId() + " not found"
            )
        );

        //2. Create a sale
        Sale sale = new Sale();
        sale.setCustomer(customer);
        sale.setSaleDate(LocalDateTime.now());
        
        BigDecimal totalAmount = BigDecimal.ZERO;

        //3. Process each sale item
        for(SaleItemDTO itemDTO : dto.getSaleItems()){

            Product product = productRepository.findById(itemDTO.getProductId()).orElseThrow(
                () -> new ProductNotFoundException(
                    "Product with id " + itemDTO.getProductId() + " not found"
                )
            );

            //4. Check stock
            if(product.getStockQuantity() < itemDTO.getQuantity()){
                throw new InsufficientStockException(
                        "Insufficient stock for product " + product.getName()
                );
            }

            //5. Get actual from database
            BigDecimal unitPrice = product.getPrice();

            //6. calculate subtotal
            BigDecimal subTotal = unitPrice.multiply(BigDecimal.valueOf(itemDTO.getQuantity()));

            //7. create saleItem
            SaleItem saleItem = new SaleItem();
            saleItem.setSale(sale);
            saleItem.setProduct(product);
            saleItem.setQuantity(itemDTO.getQuantity());
            saleItem.setUnitPrice(unitPrice);
            saleItem.setSubtotal(subTotal);

            //8. Add saleItem to Sale
            sale.getSaleItems().add(saleItem);

            //9. reduce product stock quantity
            product.setStockQuantity(product.getStockQuantity() - itemDTO.getQuantity());

            //10. add Total
            totalAmount = totalAmount.add(subTotal);
        }

        //11. set total
        sale.setTotalAmount(totalAmount);
         //12. Save entire Sale
         Sale savedSale = saleRepository.save(sale);
         //return DTO
         return SaleMapper.toDto(savedSale);
    }

    public List<SaleDTO> getAllSales(){
        List<Sale> sales = saleRepository.findAll();
        List<SaleDTO> saleDTOs = new ArrayList<>();
        for(Sale sale : sales){
            saleDTOs.add(SaleMapper.toDto(sale));
        }
        return saleDTOs;
    }

    public SaleDTO getSaleById(Long id){
        Sale sale = saleRepository.findById(id).orElseThrow(
            () -> new SaleNotFoundException(
                "Sale with id " + id + " not found"
            )
        );
        return SaleMapper.toDto(sale);
    }
}
