import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/ProductModel';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  protected product$: Observable<ProductModel>
  @Input() private id: string

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.productsService.getAllProduts()
    this.product$ = this.store.pipe(select(state => {
      return state.products.all.find(p => p._id === this.id)
    }))
  }

}
