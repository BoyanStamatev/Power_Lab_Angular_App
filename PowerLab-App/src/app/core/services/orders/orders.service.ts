import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { GetRequestBegin, GetRequestEnd } from '../../store/http/http.actions';
import { OrderModel } from '../../store/orders/models/OrderModel';
import { GetUserOrders, SubmitOrder } from '../../store/orders/order.actions';
import { OrderProductModel } from '../../store/orders/models/OrderProductModel';

const baseUrl = 'http://localhost:5000/orders/'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  getUserOrders() {
    this.store.dispatch(new GetRequestBegin())

    this.http.get<OrderModel[]>(baseUrl + 'user')
      .subscribe(orders => {
        this.store.dispatch(new GetUserOrders(orders))
        this.store.dispatch(new GetRequestEnd())
      })
  }

  submitNewOrder(products: OrderProductModel[]) {
    const order = new OrderModel()
    order.date = new Date()
    order.products = products
    order.status = 'Pending'

    this.store.dispatch(new SubmitOrder(order))
    this.http.post(baseUrl + 'submit', products).subscribe()
  }

}
