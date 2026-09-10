package com.jasim.sales_analytics.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.jasim.sales_analytics.dto.CustomerDTO;
import com.jasim.sales_analytics.entity.Customer;
import com.jasim.sales_analytics.exception.CustomerNotFoundException;
import com.jasim.sales_analytics.mapper.CustomerMapper;
import com.jasim.sales_analytics.repository.CustomerRepository;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    public CustomerDTO createCustomer(CustomerDTO dto){
        Customer customer = CustomerMapper.toEntity(dto);
        Customer savedCustomer = customerRepository.save(customer);
        return CustomerMapper.toDto(savedCustomer);
    }

    public List<CustomerDTO> getAllCustomers(){
        List<Customer> customers = customerRepository.findAll();
        List<CustomerDTO> customerDTOs = new ArrayList<>();
        for(Customer customer : customers){
            customerDTOs.add(CustomerMapper.toDto(customer));
        }
        return customerDTOs;
    }

    public CustomerDTO getCustomerById(Long id){
        Customer customer = customerRepository.findById(id).orElseThrow(
            () -> new CustomerNotFoundException(
                "Customer with id " + id + " not found"
        ));
        return CustomerMapper.toDto(customer);
    }

    public CustomerDTO updateCustomer(Long id, CustomerDTO dto){
        Customer customer = customerRepository.findById(id).orElseThrow(
            () -> new CustomerNotFoundException(
                "Customer with id " + id + " not found"
            )
        );

        customer.setName(dto.getName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setActive(dto.getActive());
        Customer updatedCustomer = customerRepository.save(customer);

        return CustomerMapper.toDto(updatedCustomer);
    }

    public void deleteCustomer(Long id){
        Customer customer = customerRepository.findById(id).orElseThrow(
            () -> new CustomerNotFoundException(
                "Customer with id " + id + " not found"
            )
        );
        customerRepository.delete(customer);
    }
}
