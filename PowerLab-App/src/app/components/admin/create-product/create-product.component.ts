import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/core/services/products/products.service';
import CustomValidators from 'src/app/core/utils/CustomValidators';
import { CreateProductModel } from 'src/app/core/store/products/models/CreateProductsModel';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  protected createForm

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      ingredients: ['', [
        Validators.required,
        Validators.minLength(3),
        CustomValidators.noSpaceAfterComma.bind(this),
        CustomValidators.noCommaAtTheEnd.bind(this)]
      ],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      image: ['', [Validators.required, Validators.minLength(14), Validators.pattern('^(http|https):\/\/[a-zA-Z0-9]+.*$')]],
      weight: ['', [Validators.required, Validators.min(1), Validators.max(20000)]],
      price: ['', [Validators.required, Validators.min(0)]]
    })
  }

  create() {
    if (this.createForm.invalid) { return }

    const product: CreateProductModel = Object.assign({}, this.createForm.value)

    this.productsService.createProduct(product)
  }

  get name() {
    return this.createForm.get('name')
  }

  get ingredients() {
    return this.createForm.get('ingredients')
  }

  get description() {
    return this.createForm.get('description')
  }

  get image() {
    return this.createForm.get('image')
  }

  get weight() {
    return this.createForm.get('weight')
  }

  get price() {
    return this.createForm.get('price')
  }

}
