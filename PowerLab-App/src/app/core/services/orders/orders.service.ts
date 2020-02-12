import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { GetRequestBegin, GetRequestEnd } from '../../store/http/http.actions';
import { OrderModel } from '../../store/orders/models/OrderModel';
import { GetUserOrders } from '../../store/orders/order.actions';

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
}
