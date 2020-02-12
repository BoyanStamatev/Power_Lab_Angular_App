import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/core/store/orders/models/OrderModel';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from '../../base.component';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent extends BaseComponent implements OnInit {

  protected orders: OrderModel[]
  protected notFoundMessage = 'You have not made any orders!'
  private subscription$: Subscription

  constructor(private store: Store<AppState>) {
    super()
  }

  ngOnInit() {
    this.subscription$ = this.store
      .pipe(select(state => state.orders.userOrders))
      .subscribe(orders => {
        this.orders = orders
      })

    this.subscriptions.push(this.subscription$)
  }

  getTotalSum(products) {
    let total = 0
    for (const pr of products) {
      total += pr.price * pr.quantity
    }

    return total
  }

  toLocaleString(date) {
    return new Date(date).toLocaleString()
  }
}
