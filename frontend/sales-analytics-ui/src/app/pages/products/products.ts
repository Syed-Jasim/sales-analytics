import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule,
  DecimalPipe
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

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
  totalInventoryValue = 0;
  lowStockProducts = 0;

  showProductForm = false;

  isSaving = false;

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
      next: (products: Product[]) => {
        this.products = products;
        this.filteredProducts = [...products];

        this.calculateSummary();

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Products loading error:',
          error
        );

        this.errorMessage =
          'Unable to load products.';
      }
    });
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(
          'Categories loading error:',
          error
        );

        this.errorMessage =
          'Unable to load categories.';
      }
    });
  }

  openProductForm(): void {
    this.showProductForm = true;

    this.successMessage = '';
    this.errorMessage = '';

    this.resetProductForm();
  }

  closeProductForm(): void {
    this.showProductForm = false;

    this.successMessage = '';
    this.errorMessage = '';

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

    if (
      !this.newProduct.name.trim() ||
      !this.newProduct.sku.trim()
    ) {
      this.errorMessage =
        'Product name and SKU are required.';

      return;
    }

    if (
      this.newProduct.price <= 0 ||
      this.newProduct.stockQuantity < 0 ||
      this.newProduct.categoryId <= 0
    ) {
      this.errorMessage =
        'Please enter valid product details.';

      return;
    }

    const productRequest: ProductRequest = {
      name: this.newProduct.name.trim(),
      sku: this.newProduct.sku.trim(),
      price: Number(this.newProduct.price),
      stockQuantity: Number(
        this.newProduct.stockQuantity
      ),
      active: this.newProduct.active,
      categoryId: Number(
        this.newProduct.categoryId
      )
    };

    this.isSaving = true;

    this.productsService
      .createProduct(productRequest)
      .subscribe({

        next: (createdProduct: Product) => {
          this.products = [
            ...this.products,
            createdProduct
          ];

          this.applyFilters();

          this.isSaving = false;

          this.showProductForm = false;

          this.successMessage =
            'Product added successfully.';

          this.resetProductForm();

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(
            'Product creation error:',
            error
          );

          this.isSaving = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to create product. Please try again.';

          this.cdr.detectChanges();
        }
      });
  }

  applyFilters(): void {
    const search = this.searchText
      .trim()
      .toLowerCase();

    this.filteredProducts = this.products.filter(
      (product: Product) => {

        const matchesSearch =
          !search ||
          product.name.toLowerCase().includes(search) ||
          product.sku.toLowerCase().includes(search);

        const matchesCategory =
          !this.selectedCategoryId ||
          product.categoryId.toString() ===
            this.selectedCategoryId;

        const matchesStockStatus =
          !this.selectedStockStatus ||
          this.getStockStatus(
            product.stockQuantity
          ) === this.selectedStockStatus;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesStockStatus
        );
      }
    );

    this.calculateSummary();
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedCategoryId = '';
    this.selectedStockStatus = '';

    this.filteredProducts = [
      ...this.products
    ];

    this.calculateSummary();
  }

  calculateSummary(): void {
    this.totalProducts =
      this.filteredProducts.length;

    this.totalInventoryValue =
      this.filteredProducts.reduce(
        (total, product) =>
          total +
          Number(product.price) *
          Number(product.stockQuantity),
        0
      );

    this.lowStockProducts =
      this.filteredProducts.filter(
        (product) =>
          product.stockQuantity <= 5
      ).length;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      (category) =>
        category.id === categoryId
    );

    return category
      ? category.name
      : `Category #${categoryId}`;
  }

  getStockStatus(stockQuantity: number): string {
    if (stockQuantity === 0) {
      return 'OUT_OF_STOCK';
    }

    if (stockQuantity <= 5) {
      return 'LOW_STOCK';
    }

    return 'IN_STOCK';
  }

  getStockLabel(stockQuantity: number): string {
    const status =
      this.getStockStatus(stockQuantity);

    if (status === 'OUT_OF_STOCK') {
      return 'Out of Stock';
    }

    if (status === 'LOW_STOCK') {
      return 'Low Stock';
    }

    return 'In Stock';
  }
}