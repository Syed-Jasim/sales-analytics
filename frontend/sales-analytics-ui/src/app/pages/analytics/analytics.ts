import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnalyticsService } from '../../services/analytics';

@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit {

  revenue = 0;
  orders = 0;
  productsSold = 0;

  constructor(
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAnalyticsData();
  }

  loadAnalyticsData(): void {

    this.analyticsService.getRevenue().subscribe({
      next: (value: number) => {
        this.revenue = value;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Revenue error:', error);
      }
    });

    this.analyticsService.getOrders().subscribe({
      next: (value: number) => {
        this.orders = value;
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
}