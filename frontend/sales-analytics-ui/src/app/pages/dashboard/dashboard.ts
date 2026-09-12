import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { AnalyticsService } from '../../services/analytics';
import { SalesService, Sale } from '../../services/sales';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
  CommonModule,
  BaseChartDirective
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  revenue = 0;
  orders = 0;
  productsSold = 0;
  averageOrderValue = 0;

  public revenueChartData: ChartConfiguration<'bar'>['data'] = {
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

  public revenueChartOptions: ChartOptions<'bar'> = {
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

  constructor(
    private analyticsService: AnalyticsService,
    private salesService: SalesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadRevenueChart();
  }

  loadDashboardData(): void {

    this.analyticsService.getRevenue().subscribe({
      next: (data) => {
        this.revenue = data;
        this.calculateAverageOrderValue();
        this.cdr.detectChanges();
      }
    });

    this.analyticsService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.calculateAverageOrderValue();
        this.cdr.detectChanges();
      }
    });

    this.analyticsService.getProductsSold().subscribe({
      next: (data) => {
        this.productsSold = data;
        this.cdr.detectChanges();
      }
    });

  }

  calculateAverageOrderValue(): void {
    this.averageOrderValue =
      this.orders > 0 ? this.revenue / this.orders : 0;
  }

  loadRevenueChart(): void {

    this.salesService.getSales().subscribe({
      next: (sales: Sale[]) => {

        const labels = sales.map((sale) =>
          new Date(sale.saleDate).toLocaleDateString()
        );

        const revenueData = sales.map((sale) =>
          sale.totalAmount
        );

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

        this.cdr.detectChanges();
      }
    });

  }
}