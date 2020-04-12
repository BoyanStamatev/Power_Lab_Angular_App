import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/core/models/OrderModel';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from '../../base.component';
import { Store, select } from '@ngrx/store';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { getTotalSum, toLocaleString } from 'src/app/core/utils/helper-functions';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent extends BaseComponent implements OnInit {
 
  protected orders: OrderModel[]
  private subscription$: Subscription
  protected getTotalSum = getTotalSum
  protected toLocaleString = toLocaleString
  protected pageSize: number = 5
  protected currentPage: number = 1
  protected notFoundMessage = 'You have not made any orders!'

  constructor(
    private store: Store<AppState>,
    private ordersService: OrdersService
    ) {
    super()
  }

  ngOnInit() {
    this.ordersService.getUserOrders()
    this.subscription$ = this.store
      .pipe(select(state => state))
      .subscribe(state  => {
        if (state.http.ordersRequestMade) {
          this.orders = state.orders.userOrders
          .sort((a: OrderModel, b: OrderModel) => +new Date(b.date) - +new Date(a.date))
        }
      })

    this.subscriptions.push(this.subscription$)
  }

  changePage (page) {
    this.currentPage = page
  }

  trackByIds(index: number, order: OrderModel): string {
    return order._id
  }
}
