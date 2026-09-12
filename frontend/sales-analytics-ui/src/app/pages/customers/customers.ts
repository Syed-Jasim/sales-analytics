import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  CustomersService,
  Customer
} from '../../services/customers';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {

  customers: Customer[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private customersService: CustomersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.customersService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.error('Customers API error:', error);
        this.loading = false;
        this.errorMessage = 'Unable to load customers';
        this.cdr.detectChanges();
      }
    });
  }

  refreshCustomers(): void {
    this.loadCustomers();
  }
}