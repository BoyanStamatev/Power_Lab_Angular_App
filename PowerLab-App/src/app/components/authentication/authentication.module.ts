import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authenticationComponents } from '.';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { fas } from '@fortawesome/free-solid-svg-icons'; 
library.add(fas);

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
