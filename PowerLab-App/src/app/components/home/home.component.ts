import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../products/ProductModul';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 public products$: Observable<ProductModel[]>

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.productsService.getAllProduts()
    this.products$ = this.store.pipe(select(state => state.products.all
      .sort((a,b) => b.likes.length - a.likes.length)
      .slice(0, 3) ))
  }

}
