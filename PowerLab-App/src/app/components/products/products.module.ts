import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'

import { productsComponent } from '.';
import { ProductsRoutingModule } from './products.routing';
import { DetailsPageComponent } from './details-page/details-page.component';

@NgModule({
  declarations: [
    ...productsComponent,
    DetailsPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    ProductsRoutingModule
  ],
  exports: [
    ...productsComponent
  ]
})
export class ProductsModule { }
