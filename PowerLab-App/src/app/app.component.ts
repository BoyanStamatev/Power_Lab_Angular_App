import { Component, OnInit } from '@angular/core';
import { ProductsService } from './core/services/products/products.service';
import { BaseComponent } from './components/base.component';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from './core/store/app.state';
import { NgxSpinnerService } from 'ngx-spinner'
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { OrdersService } from './core/services/orders/orders.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  
  protected getCalls: number
  private subscription$: Subscription
  
  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>,
    private spinner: NgxSpinnerService,
    private authService: AuthenticationService,
    private ordersService: OrdersService,
  ) {
    super()
  }

  ngOnInit() {
    this.productsService.getAllProducts()

    if (this.authService.isAuthenticated() && !this.authService.isAdmin()) {
      this.ordersService.getUserOrders()
    }

    if (this.authService.isAdmin()) {
      this.ordersService.getPendingOrders()
      this.ordersService.getApprovedOrders()
    }

    this.subscription$ = this.store
    .pipe(select(state => state.http.currentGetCalls), delay(0))
    .subscribe(calls => {
      if ((!this.getCalls || this.getCalls === 0) && calls > 0) {
        this.spinner.show()
      }

      if (this.getCalls > 0 && calls === 0) {
        this.spinner.hide()
      }

      this.getCalls = calls
    })

  this.subscriptions.push(this.subscription$)
  }

}