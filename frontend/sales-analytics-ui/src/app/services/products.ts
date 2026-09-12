import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  active: boolean;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly productsUrl =
    'http://localhost:8080/api/products';

  private readonly categoriesUrl =
    'http://localhost:8080/api/categories';

  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.productsUrl
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      this.categoriesUrl
    );
  }

  createProduct(product: ProductRequest): Observable<Product> {
    return this.http.post<Product>(
      this.productsUrl,
      product
    );
  }
}

export interface ProductRequest {
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  active: boolean;
  categoryId: number;
}