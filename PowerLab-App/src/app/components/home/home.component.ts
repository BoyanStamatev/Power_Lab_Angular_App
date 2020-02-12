import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from '../../core/store/products/models/ProductModel';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModalComponent } from '../authentication/register-modal/register-modal.component';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

 protected products: ProductModel[]
 private subscription$: Subscription

  constructor(
    protected authService: AuthenticationService,
    private productsService: ProductsService,
    private store: Store<AppState>,
    private modalService: NgbModal
  ) {
    super()
   }

  ngOnInit() {
    this.productsService.getAllProducts()

    this.subscription$ = this.store.pipe(select(state => state.products.all))
    .subscribe(products => {
      this.products = products
      .sort((a,b) => b.likes.length - a.likes.length)
      .slice(0, 3) 
    })

      this.subscriptions.push(this.subscription$)
  }

  openRegisterModal() {
    const registerRef = this.modalService.open(RegisterModalComponent)
    registerRef.result.then((res) => {
      console.log('(f)openRegisterModal :', res)
      
    }).catch((err) => {
      console.log('(f)openRegisterModal :', err)
      
    })

  }

}
