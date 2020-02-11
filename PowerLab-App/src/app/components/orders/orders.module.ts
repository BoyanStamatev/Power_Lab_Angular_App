import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ordersComponents } from '.';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders.routing';



@NgModule({
  declarations: [
    ...ordersComponents
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ],
  exports: [
    ...ordersComponents

  ]
})
export class OrdersModule { }
