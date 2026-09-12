import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaleItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Sale {
  id: number;
  customerId: number;
  saleDate: string;
  totalAmount: number;
  saleItems: SaleItem[];
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  active: boolean;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  active: boolean;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private readonly salesUrl = 'http://localhost:8080/api/sales';
  private readonly customersUrl = 'http://localhost:8080/api/customers';
  private readonly productsUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.salesUrl);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
}