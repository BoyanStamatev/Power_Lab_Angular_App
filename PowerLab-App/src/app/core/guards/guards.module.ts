import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from './authentication/admin.guard';
import { AuthenticationGuard } from './authentication/authentication.guard';



@NgModule({
  declarations: [],
  providers: [ AuthenticationGuard, AdminGuard ],
  imports: [
    CommonModule
  ]
})
export class GuardsModule { }
