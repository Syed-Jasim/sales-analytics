package com.jasim.sales_analytics.mapper;

import com.jasim.sales_analytics.dto.CustomerDTO;
import com.jasim.sales_analytics.entity.Customer;

public class CustomerMapper {
    
    public static CustomerDTO toDto(Customer customer){
        return new CustomerDTO(
            customer.getId(),
            customer.getName(),
            customer.getEmail(),
            customer.getPhone(),
            customer.getAddress(),
            customer.getActive()
        );
    }

    public static Customer toEntity(CustomerDTO dto){
        Customer customer = new Customer();
        customer.setId(dto.getId());
        customer.setName(dto.getName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setActive(dto.getActive());
        return customer;
    }
}
