import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../store/app.state';
import { Store, select } from '@ngrx/store';
import { OrderModel } from '../../models/OrderModel';
import { GetUserOrders, SubmitOrder, GetPendingOrders, ApproveOrder, GetApprovedOrders } from '../../store/orders/order.actions';
import { OrderProductModel } from '../../models/OrderProductModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ResponseDataModel } from '../../models/ResponseDataModel';
import { ClearCart } from '../../store/cart/cart.actions';

const baseUrl = 'http://localhost:5000/orders/'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersRequestMade: boolean

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.store
      .pipe(select(state => state.http.ordersRequestMade))
      .subscribe(data => {
        this.ordersRequestMade = data
      })
  }

  getUserOrders() {
    if (this.ordersRequestMade) { return }
    this.spinner.show()
    this.http.get<OrderModel[]>(baseUrl + 'user')
      .subscribe(orders => {
        this.store.dispatch(new GetUserOrders(orders))
        this.spinner.hide()
      })
  }

  submitNewOrder(products: OrderProductModel[]) {
    this.spinner.show()
    this.http.post(baseUrl + 'submit', products)
    .subscribe((res: ResponseDataModel) => {
      this.store.dispatch(new SubmitOrder(res.data))
      this.store.dispatch(new ClearCart())
      this.spinner.hide()
      this.router.navigate(['/orders/my'])
    })
  }

  getPendingOrders() {
    this.spinner.show()
    this.http.get<OrderModel[]>(`${baseUrl}pending`)
      .subscribe(orders => {
        this.store.dispatch(new GetPendingOrders(orders))
        this.spinner.hide()
    })
  }

  approveOrder(id: string) {
    this.store.dispatch(new ApproveOrder(id))
    this.http
      .post(`${baseUrl}approve/${id}`, {})
      .subscribe()
  }

  getApprovedOrders() {
    this.spinner.show()
    this.http.get<OrderModel[]>(`${baseUrl}approved`)
      .subscribe(orders => {
        this.store.dispatch(new GetApprovedOrders(orders))
        this.spinner.hide()
    })
  }

}
