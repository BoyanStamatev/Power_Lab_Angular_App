import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authenticationComponents } from '.';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 


@NgModule({
  declarations: [
    ...authenticationComponents
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...authenticationComponents
  ],
  entryComponents: [
    ...authenticationComponents
  ]
})
export class AuthenticationModule { }
