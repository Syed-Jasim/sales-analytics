import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  SalesService,
  Sale,
  Customer,
  Product
} from '../../services/sales';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales implements OnInit {

  sales: Sale[] = [];
  customers: Customer[] = [];
  products: Product[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private salesService: SalesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSales();
    this.loadCustomers();
    this.loadProducts();
  }

  loadSales(): void {
    this.loading = true;
    this.errorMessage = '';

    this.salesService.getSales().subscribe({
      next: (data: Sale[]) => {
        this.sales = data;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.error('Sales API error:', error);
        this.loading = false;
        this.errorMessage = 'Unable to load sales';
        this.cdr.detectChanges();
      }
    });
  }

  loadCustomers(): void {
    this.salesService.getCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data;
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.error('Customers API error:', error);
      }
    });
  }

  loadProducts(): void {
    this.salesService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.error('Products API error:', error);
      }
    });
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(
      customer => customer.id === customerId
    );

    return customer ? customer.name : 'Unknown Customer';
  }

  getProductName(productId: number): string {
    const product = this.products.find(
      product => product.id === productId
    );

    return product ? product.name : 'Unknown Product';
  }

  refreshSales(): void {
    this.loadSales();
    this.loadCustomers();
    this.loadProducts();
  }
}