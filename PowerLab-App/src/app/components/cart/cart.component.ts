import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { ProductInCartModel } from 'src/app/core/models/ProductInCartModel';
import { SyncCart, RemoveFromCart } from 'src/app/core/store/cart/cart.actions';
import { BaseComponent } from '../base.component';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/core/services/orders/orders.service';
import { animations } from './cart.animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: animations
})
export class CartComponent extends BaseComponent implements OnInit {

  protected products: ProductInCartModel[]
  protected totalSum: number
  private subscription$: Subscription

  constructor(
    private store: Store<AppState>,
    private ordersService: OrdersService
    ) {
    super()
   }

  ngOnInit() {
    this.subscription$ = this.store.pipe(select(state => state))
      .subscribe(state => {
        const products = state.products.all
        const cartProductsIds = state.cart.products.map(p => p.productId)
        const productsInCart = products.filter(p => cartProductsIds.includes(p._id))

        let total = 0
        const allProducts: ProductInCartModel[] = []

        for (const pr of productsInCart) {
          const product: ProductInCartModel = {
            _id: pr._id,
            name: pr.name,
            image: pr.image,
            price: pr.price,
            quantity: state.cart.products.find(p => p.productId === pr._id).quantity,
            ingredients: pr.ingredients
          }
          total += product.quantity * product.price

          allProducts.push(product)
        }

        this.products = allProducts
        this.totalSum = total
      })

      this.subscriptions.push(this.subscription$)
  }

  onQuantChange(event, id) {
    const inputValue = event.target.value
    if (!isNaN(inputValue) && parseInt(inputValue, 10) >= 1) {
      this.store.dispatch(new SyncCart(id, parseInt(inputValue, 10)))
    } else {
      this.store.dispatch(new SyncCart(id, 1))
    }
  }

  onRefreshButtonClick(id) {
    this.store.dispatch(new SyncCart(id, 1))
  }

  onDeleteButtonClick(id) {
    this.store.dispatch(new RemoveFromCart(id))
  }

  onCheckoutButtonClick() {
    const products = []
    for (const pr of this.products) {
      products.push({
        id: pr._id,
        name: pr.name,
        quantity: pr.quantity,
        price: pr.price
      })
    }

    this.ordersService.submitNewOrder(products)
  }

  trackByIds(product: ProductInCartModel): string {
    return product._id
  }

}
