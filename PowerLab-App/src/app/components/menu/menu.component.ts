import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../products/models/ProductModel';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { AppState } from 'src/app/core/store/app.state';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

public products$: Observable<ProductModel[]>

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.productsService.getAllProduts()
    this.products$ = this.store.pipe(select(state => state.products.all))
  }

}
