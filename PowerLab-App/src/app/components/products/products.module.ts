import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'

import { productsComponent } from '.';

@NgModule({
  declarations: [
    ...productsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    ...productsComponent
  ]
})
export class ProductsModule { }
