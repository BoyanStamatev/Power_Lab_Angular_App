import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { getTotalSum, toLocaleString } from 'src/app/core/utils/helper-functions';
import { OrderModel } from 'src/app/core/models/OrderModel';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { animations } from './pending-orders.animation'
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { UndoOrdersRequestMade } from 'src/app/core/store/http/http.actions';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss'],
  animations: animations
})
export class PendingOrdersComponent extends BaseComponent implements OnInit {

  protected pageSize: number = 5
  protected currentPage: number = 1
  protected notFoundMessage = 'There are no pending orders at the moment.'
  protected getTotalSum = getTotalSum
  protected toLocaleString = toLocaleString
  protected pendingOrders: OrderModel[]
  private subscription$: Subscription

  constructor(
    private store: Store<AppState>,
    private ordersService: OrdersService
  ) {
    super()
   }

  ngOnInit() {
    this.store.dispatch(new UndoOrdersRequestMade())
    this.ordersService.getPendingOrders()
    this.subscription$ = this.store
      .pipe(select(state => state))
      .subscribe(state => {
        if (state.http.ordersRequestMade) {
          this.pendingOrders = state.orders.pendingOrders.sort((a: OrderModel, b: OrderModel) => +new Date(b.date) - +new Date(a.date))
        }
      })

    this.subscriptions.push(this.subscription$)
  }

  approve(id: string) {
    this.ordersService.approveOrder(id)
  }

}
