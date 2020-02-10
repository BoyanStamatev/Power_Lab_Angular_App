import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProductModel } from 'src/app/components/products/models/ProductModel';

const allProductsUrl = 'http://localhost:5000/power/all'

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  getAllProduts() {
    this.http.get<ProductModel[]>(allProductsUrl).subscribe(products => {
      // this.store.dispatch(new GetAllProduts(products))
    })
  }
}
