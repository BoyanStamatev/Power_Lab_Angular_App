import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProductModel } from 'src/app/core/store/products/models/ProductModel';
import { ToastrService } from 'ngx-toastr';
import { GetAllProducts, AddProductReview, LikeProduct, UnlikeProduct } from '../../store/products/products.action';
import { ReviewModel } from 'src/app/core/store/products/models/ReviewModel';
import { ResponseDataModel } from '../../models/ResponseDataModel';
import { GetRequestBegin, GetRequestEnd } from '../../store/http/http.actions';


const baseUrl = 'http://localhost:5000/power/'
const minutes = 1000 * 60 * 5

@Injectable()
export class ProductsService {
  private productsCached: boolean = false
  private cacheTime: number

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  getAllProducts() {
    if (this.productsCached && (new Date().getTime() - this.cacheTime) < minutes) {
      return
    }
    this.productsCached = false
    this.cacheTime = null

    this.store.dispatch(new GetRequestBegin())

    this.http.get<ProductModel[]>(baseUrl + 'all').subscribe(products => {
      this.productsCached = true
      this.cacheTime = new Date().getTime()
      this.store.dispatch(new GetAllProducts(products))
      this.store.dispatch(new GetRequestEnd())
    })
  }

  addProductReview(model: ReviewModel, id: string) {
      this.store.dispatch(new AddProductReview(model, id))
      this.http.post(baseUrl+'review/'+id, model).subscribe()
  }
  
  likeProduct(id: string, username: string) {
      this.store.dispatch(new LikeProduct(id, username))
      this.http.post(`${baseUrl}like/${id}`, {}).subscribe()
  }

  unlikeProduct(id: string, username: string) {
      this.store.dispatch(new UnlikeProduct(id, username))
      this.http.post(`${baseUrl}unlike/${id}`, {}).subscribe()
  }
}
