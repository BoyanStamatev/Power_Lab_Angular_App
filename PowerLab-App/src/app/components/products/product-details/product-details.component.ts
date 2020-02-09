import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../ProductModul';
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

  public product$: Observable<ProductModel>
  private id: string

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

  ngOnInit() {
    this.productsService.getAllProduts()
    this.product$ = this.store.pipe(select(state => {
      return state.products.all.find(p => p._id === this.id)
    }))
  }

}
