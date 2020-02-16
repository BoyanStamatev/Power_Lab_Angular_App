import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProductModel } from 'src/app/core/store/products/models/ProductModel';
import { ToastrService } from 'ngx-toastr';
import { GetAllProducts, AddProductReview, LikeProduct, 
  UnlikeProduct, CreateProducts, DeleteProduct, EditProduct } from '../../store/products/products.action';
import { ReviewModel } from 'src/app/core/store/products/models/ReviewModel';
import { ResponseDataModel } from '../../models/ResponseDataModel';
import { GetRequestBegin, GetRequestEnd } from '../../store/http/http.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateProductModel } from '../../store/products/models/CreateProductsModel';
import { Router } from '@angular/router';


const baseUrl = 'http://localhost:5000/power/'
const addReviewUrl = 'http://localhost:5000/reviews/create/'

const minutes = 1000 * 60 * 5

@Injectable()
export class ProductsService {

  private productsCached: boolean = false
  private cacheTime = new Date().getTime()

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router,
    private spiner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  getAllProducts() {
    if (this.productsCached && (new Date().getTime() - this.cacheTime) < minutes) {
      return
    }
    this.productsCached = true
    this.cacheTime = new Date().getTime()

    this.store.dispatch(new GetRequestBegin())

    this.http.get<ProductModel[]>(baseUrl + 'all').subscribe(products => {
      this.productsCached = true
      this.cacheTime = new Date().getTime()
      this.store.dispatch(new GetAllProducts(products))
      this.store.dispatch(new GetRequestEnd())
    })
  }

  createProduct(model: CreateProductModel) {
    this.spiner.show
    this.http.post(baseUrl + 'create', model)
      .subscribe((res: ResponseDataModel) => {
        this.store.dispatch(new CreateProducts(res.data))
        this.spiner.hide
        this.router.navigate(['/menu'])
        this.toastr.success('Product added successfully.')
      })
  }

  deleteProduct(id: string, activeModal) {
    this.spiner.show
    this.http.delete(baseUrl + 'delete/' + id)
      .subscribe(res => {
        this.store.dispatch(new DeleteProduct(id))
        this.spiner.hide
        activeModal.close()
        this.toastr.success('Product deleted successfully.')
      })
  }

  editProduct(model: ProductModel) {
    this.spiner.show()
    this.http.post(baseUrl + 'edit/' + model._id, model)
      .subscribe((res: ResponseDataModel) => {
        this.store.dispatch(new EditProduct(res.data))
        this.spiner.hide()
        this.router.navigate(['/menu'])
        this.toastr.success('Product edited successfully.')
      })
  }

  addProductReview(model: ReviewModel, id: string) {
    this.spiner.show()
    this.http.post(`${addReviewUrl}${id}`, model)
    .subscribe((res: ResponseDataModel) => {
      this.store.dispatch(new AddProductReview(res.data, id))
      this.spiner.hide()
      this.toastr.success('Review added successfully.')
    })
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
