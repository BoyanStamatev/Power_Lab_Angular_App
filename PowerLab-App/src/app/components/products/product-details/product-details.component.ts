import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { Router } from '@angular/router';
import { CartProductModel } from 'src/app/core/models/CartProductModel';
import { AddToCart } from 'src/app/core/store/cart/cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() protected product: ProductModel

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() { }

  addToCart() {
    const productToAdd = new CartProductModel(
      this.product._id,
      this.product.name,
      1,
      this.product.price)

    this.store.dispatch(new AddToCart(productToAdd))
    this.router.navigate(['/cart'])
  }

}
