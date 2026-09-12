import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  ProductsService,
  Product,
  Category
} from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productsService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.error('Products API error:', error);
        this.loading = false;
        this.errorMessage = 'Unable to load products';
        this.cdr.detectChanges();
      }
    });
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.cdr.detectChanges();
      },

      error: (error: any) => {
        console.error('Categories API error:', error);
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      category => category.id === categoryId
    );

    return category ? category.name : 'No Category';
  }

  refreshProducts(): void {
    this.loadProducts();
    this.loadCategories();
  }
}