import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductsModule } from './components/products/products.module';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersModule } from './components/orders/orders.module';
import { AdminModule } from './components/admin/admin.module';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'product', loadChildren: () => ProductsModule },
  { path: 'orders', loadChildren: () => OrdersModule },
  { path: 'admin', loadChildren: () => AdminModule },
  { path: 'cart', component: CartComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
