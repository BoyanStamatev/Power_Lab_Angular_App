import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { sharedComponents } from '.';


@NgModule({
  declarations: [
    ...sharedComponents,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    ...sharedComponents
  ]
})
export class SharedModule { }
