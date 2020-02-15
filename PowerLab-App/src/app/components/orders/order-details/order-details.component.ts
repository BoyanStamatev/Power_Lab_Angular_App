import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from 'src/app/core/store/orders/models/OrderModel';
import { Subscription } from 'rxjs';
import { getTotalSum, toLocaleString } from 'src/app/core/utils/helper-functions';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent extends BaseComponent implements OnInit {

  protected order: OrderModel
  private id: string
  private subscription$: Subscription
  protected getTotalSum = getTotalSum
  protected toLocaleString = toLocaleString
  protected notFoundMessage = 'ORDER NOT FOUND'

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    super()
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.subscription$ = this.store
      .pipe(select(state => state.orders))
      .subscribe(orders => {
        if (orders.userOrders.length > 0) {
          this.order = orders.userOrders.find(o => o._id === this.id)
        } else if (orders.pendingOrders.length > 0) {
          this.order = orders.pendingOrders.find(o => o._id === this.id)
        }
      })

    this.subscriptions.push(this.subscription$)
  }

}
