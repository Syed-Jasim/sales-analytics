import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Products } from './pages/products/products';
import { Customers } from './pages/customers/customers';
import { Sales } from './pages/sales/sales';
import { Analytics } from './pages/analytics/analytics';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'products', component: Products },
  { path: 'customers', component: Customers },
  { path: 'sales', component: Sales },
  { path: 'analytics', component: Analytics },
  { path: '**', redirectTo: 'dashboard' }
];