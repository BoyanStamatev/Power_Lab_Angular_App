import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'

import { productsComponent } from '.';
import { ProductsRoutingModule } from './products.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductDeleteModalComponent } from './product-delete-modal/product-delete-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ...productsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ProductsRoutingModule,
    SharedModule
  ],
  exports: [
    ...productsComponent
  ],
  entryComponents: [
    ProductDeleteModalComponent
  ]
})
export class ProductsModule { }
