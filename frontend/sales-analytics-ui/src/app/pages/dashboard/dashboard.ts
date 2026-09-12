import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../services/analytics';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  revenue = 0;
  orders = 0;
  productsSold = 0;
  averageOrderValue = 0;

  constructor(
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
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
    if (this.orders > 0) {
      this.averageOrderValue = this.revenue / this.orders;
    } else {
      this.averageOrderValue = 0;
    }
  }
}