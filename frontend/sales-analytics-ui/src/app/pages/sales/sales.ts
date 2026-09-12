import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule,
  DatePipe,
  DecimalPipe
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  SalesService,
  Sale,
  SaleItem,
  Customer,
  Product
} from '../../services/sales';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales implements OnInit {

  sales: Sale[] = [];
  filteredSales: Sale[] = [];

  customers: Customer[] = [];
  products: Product[] = [];

  searchText = '';
  selectedCustomerId = '';
  selectedDate = '';

  totalSales = 0;
  totalRevenue = 0;

  constructor(
    private salesService: SalesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
    this.loadSales();
  }

  loadSales(): void {
    this.salesService.getSales().subscribe({
      next: (sales: Sale[]) => {
        this.sales = sales;
        this.filteredSales = [...sales];

        this.calculateSummary();

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Sales loading error:', error);
      }
    });
  }

  loadCustomers(): void {
    this.salesService.getCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers = customers;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Customers loading error:', error);
      }
    });
  }

  loadProducts(): void {
    this.salesService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Products loading error:', error);
      }
    });
  }

  applyFilters(): void {
    const search = this.searchText
      .trim()
      .toLowerCase();

    this.filteredSales = this.sales.filter((sale) => {

      const customerName =
        this.getCustomerName(sale.customerId)
          .toLowerCase();

      const saleId =
        sale.id.toString();

      const matchesSearch =
        !search ||
        saleId.includes(search) ||
        customerName.includes(search);

      const matchesCustomer =
        !this.selectedCustomerId ||
        sale.customerId.toString() ===
          this.selectedCustomerId;

      const saleDate =
        new Date(sale.saleDate)
          .toISOString()
          .split('T')[0];

      const matchesDate =
        !this.selectedDate ||
        saleDate === this.selectedDate;

      return (
        matchesSearch &&
        matchesCustomer &&
        matchesDate
      );
    });

    this.calculateSummary();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCustomerId = '';
    this.selectedDate = '';

    this.filteredSales = [...this.sales];

    this.calculateSummary();
  }

  calculateSummary(): void {
    this.totalSales = this.filteredSales.length;

    this.totalRevenue = this.filteredSales.reduce(
      (total, sale) =>
        total + Number(sale.totalAmount),
      0
    );
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(
      (customer) =>
        customer.id === customerId
    );

    return customer
      ? customer.name
      : `Customer #${customerId}`;
  }

  getProductName(productId: number): string {
    const product = this.products.find(
      (product) =>
        product.id === productId
    );

    return product
      ? product.name
      : `Product #${productId}`;
  }

  getSaleItems(sale: Sale): SaleItem[] {
    return sale.saleItems || [];
  }
}