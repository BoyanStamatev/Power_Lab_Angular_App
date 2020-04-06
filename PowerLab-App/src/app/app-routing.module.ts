import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductsModule } from './components/products/products.module';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersModule } from './components/orders/orders.module';
import { AdminModule } from './components/admin/admin.module';
import { AuthLazyGuard } from './core/guards/authentication/auth-lazy.guard';
import { AdminGuard } from './core/guards/authentication/admin.guard';
import { AuthGuard } from './core/guards/authentication/authentication.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'product', canLoad: [AuthLazyGuard], loadChildren: () => ProductsModule },
  { path: 'orders', canLoad: [AuthLazyGuard], loadChildren: () => OrdersModule },
  { path: 'admin', canLoad: [AdminGuard], loadChildren: () => AdminModule },
  { path: 'cart', canActivate: [AuthGuard] , component: CartComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
