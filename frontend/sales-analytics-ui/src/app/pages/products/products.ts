import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ProductsService,
  Product,
  Category,
  ProductRequest
} from '../../services/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];

  searchText = '';
  selectedCategoryId = '';
  selectedStockStatus = '';

  totalProducts = 0;
  totalStock = 0;
  lowStockProducts = 0;
  outOfStockProducts = 0;

  showProductForm = false;
  isSaving = false;

  editingProductId: number | null = null;

  successMessage = '';
  errorMessage = '';

  newProduct: ProductRequest = {
    name: '',
    sku: '',
    price: 0,
    stockQuantity: 0,
    active: true,
    categoryId: 0
  };

  constructor(
    private productsService: ProductsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load products.';
        this.cdr.detectChanges();
      }
    });
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load categories.';
        this.cdr.detectChanges();
      }
    });
  }

  openProductForm(): void {
    this.editingProductId = null;
    this.resetProductForm();

    this.showProductForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  openEditForm(product: Product): void {
    this.editingProductId = product.id;

    this.newProduct = {
      name: product.name,
      sku: product.sku,
      price: product.price,
      stockQuantity: product.stockQuantity,
      active: product.active,
      categoryId: product.categoryId
    };

    this.showProductForm = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeProductForm(): void {
    this.showProductForm = false;
    this.editingProductId = null;
    this.resetProductForm();
  }

  resetProductForm(): void {
    this.newProduct = {
      name: '',
      sku: '',
      price: 0,
      stockQuantity: 0,
      active: true,
      categoryId: 0
    };
  }

  saveProduct(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.newProduct.name.trim()) {
      this.errorMessage = 'Product name is required.';
      return;
    }

    if (!this.newProduct.sku.trim()) {
      this.errorMessage = 'SKU is required.';
      return;
    }

    if (this.newProduct.price <= 0) {
      this.errorMessage = 'Price must be greater than zero.';
      return;
    }

    if (this.newProduct.stockQuantity < 0) {
      this.errorMessage = 'Stock quantity cannot be negative.';
      return;
    }

    if (!this.newProduct.categoryId) {
      this.errorMessage = 'Please select a category.';
      return;
    }

    this.isSaving = true;

    if (this.editingProductId !== null) {
      this.updateExistingProduct();
    } else {
      this.createNewProduct();
    }
  }

  private createNewProduct(): void {
    this.productsService.createProduct(this.newProduct).subscribe({
      next: (createdProduct) => {
        this.products = [
          ...this.products,
          createdProduct
        ];

        this.applyFilters();

        this.isSaving = false;
        this.showProductForm = false;
        this.editingProductId = null;

        this.resetProductForm();

        this.successMessage = 'Product added successfully.';
        this.cdr.detectChanges();
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = 'Unable to add product.';
        this.cdr.detectChanges();
      }
    });
  }

  private updateExistingProduct(): void {
    this.productsService
      .updateProduct(
        this.editingProductId!,
        this.newProduct
      )
      .subscribe({
        next: (updatedProduct) => {
          this.products = this.products.map(product =>
            product.id === updatedProduct.id
              ? updatedProduct
              : product
          );

          this.applyFilters();

          this.isSaving = false;
          this.showProductForm = false;
          this.editingProductId = null;

          this.resetProductForm();

          this.successMessage = 'Product updated successfully.';
          this.cdr.detectChanges();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Unable to update product.';
          this.cdr.detectChanges();
        }
      });
  }

  applyFilters(): void {
    const search = this.searchText
      .trim()
      .toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search);

      const matchesCategory =
        !this.selectedCategoryId ||
        product.categoryId.toString() === this.selectedCategoryId;

      const matchesStock =
        !this.selectedStockStatus ||
        this.getStockStatus(product) === this.selectedStockStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });

    this.calculateSummary();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCategoryId = '';
    this.selectedStockStatus = '';

    this.applyFilters();
  }

  calculateSummary(): void {
    this.totalProducts = this.products.length;

    this.totalStock = this.products.reduce(
      (total, product) =>
        total + product.stockQuantity,
      0
    );

    this.lowStockProducts = this.products.filter(
      product =>
        product.stockQuantity > 0 &&
        product.stockQuantity <= 5
    ).length;

    this.outOfStockProducts = this.products.filter(
      product =>
        product.stockQuantity === 0
    ).length;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      item => item.id === categoryId
    );

    return category ? category.name : 'Unknown';
  }

  getStockStatus(product: Product): string {
    if (product.stockQuantity === 0) {
      return 'out';
    }

    if (product.stockQuantity <= 5) {
      return 'low';
    }

    return 'in';
  }

  getStockLabel(product: Product): string {
    if (product.stockQuantity === 0) {
      return 'Out of Stock';
    }

    if (product.stockQuantity <= 5) {
      return 'Low Stock';
    }

    return 'In Stock';
  }
}