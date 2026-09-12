import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';

import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';

import { AnalyticsService } from '../../services/analytics';

import {
  SalesService,
  Sale,
  Product
} from '../../services/sales';

interface BestSellingProduct {
  productName: string;
  quantitySold: number;
  revenue: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit {

  revenue = 0;
  orders = 0;
  productsSold = 0;
  averageOrderValue = 0;

  products: Product[] = [];

  bestSellingProducts: BestSellingProduct[] = [];

  revenueChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        backgroundColor: '#2563eb',
        borderRadius: 8
      }
    ]
  };

  revenueChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  ordersChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.15)',
        fill: true,
        tension: 0.3
      }
    ]
  };

  ordersChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  constructor(
    private analyticsService: AnalyticsService,
    private salesService: SalesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAnalyticsData();
    this.loadCharts();
    this.loadBestSellingProducts();
  }

  loadAnalyticsData(): void {

    this.analyticsService.getRevenue().subscribe({
      next: (value: number) => {
        this.revenue = value;
        this.calculateAverageOrderValue();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Revenue error:', error);
      }
    });

    this.analyticsService.getOrders().subscribe({
      next: (value: number) => {
        this.orders = value;
        this.calculateAverageOrderValue();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Orders error:', error);
      }
    });

    this.analyticsService.getProductsSold().subscribe({
      next: (value: number) => {
        this.productsSold = value;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Products sold error:', error);
      }
    });
  }

  calculateAverageOrderValue(): void {
    this.averageOrderValue =
      this.orders > 0
        ? this.revenue / this.orders
        : 0;
  }

  loadCharts(): void {

    this.salesService.getSales().subscribe({
      next: (sales: Sale[]) => {

        const labels = sales.map((sale) =>
          new Date(sale.saleDate).toLocaleDateString()
        );

        const revenueData = sales.map(
          (sale) => sale.totalAmount
        );

        const ordersData = sales.map(() => 1);

        this.revenueChartData = {
          labels,
          datasets: [
            {
              label: 'Revenue',
              data: revenueData,
              backgroundColor: '#2563eb',
              borderRadius: 8
            }
          ]
        };

        this.ordersChartData = {
          labels,
          datasets: [
            {
              label: 'Orders',
              data: ordersData,
              borderColor: '#7c3aed',
              backgroundColor: 'rgba(124, 58, 237, 0.15)',
              fill: true,
              tension: 0.3
            }
          ]
        };

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Sales chart error:', error);
      }
    });
  }

  loadBestSellingProducts(): void {

    this.salesService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;

        this.salesService.getSales().subscribe({
          next: (sales: Sale[]) => {

            const productMap =
              new Map<number, BestSellingProduct>();

            sales.forEach((sale) => {

              sale.saleItems.forEach((item) => {

                const existingProduct =
                  productMap.get(item.productId);

                const product =
                  this.products.find(
                    (product) =>
                      product.id === item.productId
                  );

                const productName =
                  product?.name ??
                  `Product #${item.productId}`;

                if (existingProduct) {

                  existingProduct.quantitySold +=
                    item.quantity;

                  existingProduct.revenue +=
                    item.subtotal;

                } else {

                  productMap.set(item.productId, {
                    productName,
                    quantitySold: item.quantity,
                    revenue: item.subtotal
                  });

                }
              });
            });

            this.bestSellingProducts =
              Array.from(productMap.values())
                .sort(
                  (a, b) =>
                    b.quantitySold - a.quantitySold
                )
                .slice(0, 5);

            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error(
              'Best-selling sales error:',
              error
            );
          }
        });
      },
      error: (error) => {
        console.error(
          'Best-selling products error:',
          error
        );
      }
    });
  }
}