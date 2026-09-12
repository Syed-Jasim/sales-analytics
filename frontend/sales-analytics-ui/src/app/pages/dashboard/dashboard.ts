import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnalyticsService } from '../../services/analytics';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  revenue = 0;
  orders = 0;
  productsSold = 0;

  constructor(
    private analyticsService: AnalyticsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {

    this.analyticsService.getRevenue().subscribe({
      next: (value: number) => {
        console.log('Revenue:', value);
        this.revenue = value;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Revenue error:', error);
      }
    });

    this.analyticsService.getOrders().subscribe({
      next: (value: number) => {
        console.log('Orders:', value);
        this.orders = value;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Orders error:', error);
      }
    });

    this.analyticsService.getProductsSold().subscribe({
      next: (value: number) => {
        console.log('Products sold:', value);
        this.productsSold = value;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Products sold error:', error);
      }
    });

  }
}