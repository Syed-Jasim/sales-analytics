import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private readonly apiUrl = 'http://localhost:8080/api/analytics';

  constructor(private http: HttpClient) {}

  getRevenue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/revenue`);
  }

  getOrders(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/orders`);
  }

  getProductsSold(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/products-sold`);
  }
}