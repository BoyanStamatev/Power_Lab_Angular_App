import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProductModel } from 'src/app/components/products/models/ProductModel';
import { ToastrService } from 'ngx-toastr';
import { GetAllProducts, AddProductReview } from '../../store/products/products.action';
import { ReviewModel } from 'src/app/components/products/models/ReviewModel';
import { ResponseDataModel } from '../../models/ResponseDataModel';


const baseUrl = 'http://localhost:5000/power/'

@Injectable()
export class ProductsService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) { }

  getAllProducts() {
    this.http.get<ProductModel[]>(baseUrl + 'all').subscribe(products => {
      this.store.dispatch(new GetAllProducts(products))
    })
  }

  addProductReview(model: ReviewModel, id: string) {
    this.http.post(baseUrl+'review/'+id, model).subscribe((res: ResponseDataModel) => {
      this.store.dispatch(new AddProductReview(res.data))
      this.toastr.success(res.message)
    })
  }
}
