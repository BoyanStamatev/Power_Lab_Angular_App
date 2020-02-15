import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../../../core/store/products/models/ProductModel';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { CartProductModel } from 'src/app/core/models/CartProductModel';
import { AddToCart } from 'src/app/core/store/cart/cart.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';

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
    private modalService: NgbModal
    ) { }

  ngOnInit() {
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

  openDeleteProductModal() {
    const deleteRef = this.modalService.open(ProductDeleteModalComponent)
    deleteRef.componentInstance.productId = this.product._id
    deleteRef.result.then((result) => {
      // console.log('(f)openDeleteProductModal: ', result);

    }).catch((error) => {
      console.log('(f)openDeleteProductModal: ', error);
      
    })
  }
  
}
