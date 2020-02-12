import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from '../../core/store/products/models/ProductModel';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends BaseComponent implements OnInit {

  private products: ProductModel[]
  protected productsToView: ProductModel[]
  private subscription$: Subscription
  private seacrhTerm: string = ''

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {
    super()
  }

  ngOnInit() {
    this.productsService.getAllProducts()

    this.subscription$ = this.store
    .pipe(select(state => state.products.all))
    .subscribe(products => {
      this.products = products
      this.productsToView = this.products
      .filter(p => p.name.toLowerCase().includes(this.seacrhTerm.toLowerCase()))
      
    })

    this.subscriptions.push(this.subscription$)
  }

  searchChange(event) {
    this.seacrhTerm = event.target.value
    this.productsToView = this.products.filter(p => p.name.toLowerCase().includes(this.seacrhTerm.toLowerCase()))
  }

}
