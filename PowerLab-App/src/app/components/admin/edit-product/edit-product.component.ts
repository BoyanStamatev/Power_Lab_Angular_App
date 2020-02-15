import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/core/store/products/models/ProductModel';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import CustomValidators from 'src/app/core/utils/CustomValidators';
import { BaseComponent } from '../../base.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent extends BaseComponent implements OnInit {

  protected editForm
  protected notFoundMessage = 'PRODUCT NOT FOUND'
  protected product: ProductModel
  private id: string
  private subscription$: Subscription

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    super()
   }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id')
    this.subscription$ = this.store
      .pipe(select(state => state.products.all))
      .subscribe(products => {
        this.product = products.find(p => p._id === this.id)
      })
      
      this.subscriptions.push(this.subscription$)

      this.createForm()
  }

  
  createForm() {
    if (this.product) {
      this.editForm = this.fb.group({
        name: [this.product.name, [Validators.required, Validators.minLength(3)]],
        ingredients: [this.product.ingredients.join(','), [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.noSpaceAfterComma.bind(this),
          CustomValidators.noCommaAtTheEnd.bind(this)]
        ],
        description: [this.product.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        image: [this.product.image, [
          Validators.required,
          Validators.minLength(14),
          Validators.pattern('^(http|https):\/\/[a-zA-Z0-9]+.*$')]
        ],
        weight: [this.product.weight, [Validators.required, Validators.min(1), Validators.max(800)]],
        price: [this.product.price.toFixed(2), [Validators.required, Validators.min(0)]]
      })
    }
  }

  edit() {
    if (this.editForm.invalid) { return }

    const product: ProductModel = Object.assign({}, this.product, this.editForm.value)
    this.productsService.editProduct(product)
  }

  get name () {
    return this.editForm.get('name')
  }

  get ingredients () {
    return this.editForm.get('ingredients')
  }

  get description () {
    return this.editForm.get('description')
  }

  get image () {
    return this.editForm.get('image')
  }

  get weight () {
    return this.editForm.get('weight')
  }

  get price () {
    return this.editForm.get('price')
  }
}
