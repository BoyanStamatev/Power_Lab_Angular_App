import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'

import { productsComponent } from '.';
import { ProductsRoutingModule } from './products.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';

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
    SharedModule,
    NgxSpinnerModule
  ],
  exports: [
    ...productsComponent
  ],
  entryComponents: [
    ...productsComponent
  ]
})
export class ProductsModule { }
