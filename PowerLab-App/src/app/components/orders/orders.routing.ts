import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserOrdersComponent } from './user-orders/user-orders.component'
import { OrderDetailsComponent } from './order-details/order-details.component'

const ordersRoutes: Routes = [
  { path: 'my', component: UserOrdersComponent },
  { path: 'details/:id', component: OrderDetailsComponent }
]

@NgModule({
  imports: [RouterModule.forChild(ordersRoutes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }