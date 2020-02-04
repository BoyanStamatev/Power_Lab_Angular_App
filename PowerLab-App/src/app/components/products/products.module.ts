import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productsComponent } from '.';

@NgModule({
  declarations: [
    ...productsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...productsComponent
  ]
})
export class ProductsModule { }
