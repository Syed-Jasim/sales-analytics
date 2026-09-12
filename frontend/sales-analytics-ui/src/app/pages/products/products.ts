import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  ProductsService,
  Product
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

  loading = false;
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
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

      error: (error) => {
        console.error('Products API error:', error);

        this.loading = false;
        this.errorMessage = 'Unable to load products';

        this.cdr.detectChanges();
      }
    });
  }

  refreshProducts(): void {
    this.loadProducts();
  }
}