import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'

import { productsComponent } from '.';
import { ProductsRoutingModule } from './products.routing';
import { DetailsPageComponent } from './details-page/details-page.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...productsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ProductsRoutingModule
  ],
  exports: [
    ...productsComponent
  ]
})
export class ProductsModule { }
