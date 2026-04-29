import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { ProductListComponent } from './features/products/product-list';
import { authGuard } from './core/services/auth.guard';
import { guestGuard } from './core/services/guest,guard';
import { NotFoundComponent } from './pages/not-found';
import { roleGuard } from './core/guards/role.guard';
import { UserPointsComponent } from './features/user/user-points';
import { UserOrdersComponent } from './features/user/user-orders';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/pages/admin-dashboard').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/admin/pages/products-admin').then((m) => m.ProductsAdminComponent),
      },
      {
        path: 'points',
        loadComponent: () =>
          import('./features/admin/pages/admin-points').then((m) => m.AdminPointsComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/admin/pages/admin-orders').then((m) => m.AdminOrdersComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/pages/admin-users').then((m) => m.AdminUsersComponent),
      },
    ],
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard], // seguridad: solo usuarios autenticados pueden acceder a esta ruta
  },
  {
    path: 'my-points',
    component: UserPointsComponent,
    canActivate: [authGuard, roleGuard], // seguridad: solo usuarios autenticados pueden acceder a esta ruta
    data: { role: 'USER' }, // seguridad: solo usuarios con rol USER pueden acceder a esta ruta
  },
  {
    path: 'my-orders',
    component: UserOrdersComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'USER' },
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, canActivate: [authGuard] }, // cualquier ruta no definida redirige a NotFoundComponent, pero solo si el usuario está autenticado
];
