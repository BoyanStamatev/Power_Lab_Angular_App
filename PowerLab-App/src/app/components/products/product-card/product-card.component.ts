import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../models/ProductModel';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { CartProductModel } from 'src/app/core/models/CartProductModel';
import { AddToCart } from 'src/app/core/store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() protected product: ProductModel

  constructor(
    protected authService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    ) { }

  ngOnInit() {
  }

  navigateToDetails() {
    this.router.navigate([`/product/details/${this.product._id}`])
  }

  addToCart () {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/cart'])
      return
    }

    const productToAdd = new CartProductModel(
      this.product._id,
      this.product.name,
      1,
      this.product.price)

    this.store.dispatch(new AddToCart(productToAdd))
    this.router.navigate(['/cart'])
  }

}
