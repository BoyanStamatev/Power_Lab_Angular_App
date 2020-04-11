import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { getTotalSum, toLocaleString } from 'src/app/core/utils/helper-functions';
import { OrderModel } from 'src/app/core/models/OrderModel';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { UndoOrdersRequestMade } from 'src/app/core/store/http/http.actions';

@Component({
  selector: 'app-approved-orders',
  templateUrl: './approved-orders.component.html',
  styleUrls: ['./approved-orders.component.scss']
})
export class ApprovedOrdersComponent extends BaseComponent implements OnInit {

  protected pageSize: number = 10
  protected currentPage: number = 1
  protected notFoundMessage = 'There are no approved orders at the moment.'
  protected getTotalSum = getTotalSum
  protected toLocaleString = toLocaleString
  protected approvedOrders: OrderModel[]
  private subscription$: Subscription

  constructor(
    private store: Store<AppState>,
    private ordersService: OrdersService
  ) {
    super()
   }

  ngOnInit() {
    this.store.dispatch(new UndoOrdersRequestMade())
    this.ordersService.getApprovedOrders()
    this.subscription$ = this.store
      .pipe(select(state => state))
      .subscribe(state => {
          this.approvedOrders = state.orders.approvedOrders.sort((a: OrderModel, b: OrderModel) => +new Date(b.date) - +new Date(a.date))
      })

    this.subscriptions.push(this.subscription$)
  }

  changePage (page) {
    this.currentPage = page
  }

}
