import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { allServices } from '.';



@NgModule({
  declarations: [],
  providers: [
    ...allServices
  ],
  imports: [
    CommonModule,
  ],

})
export class ServicesModule { }
