import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './authentication/authentication.guard';
import { AdminGuard } from './authentication/admin.guard';
import { AuthLazyGuard } from './authentication/auth-lazy.guard';

@NgModule({
  declarations: [],
  providers: [ AuthGuard, AdminGuard, AuthLazyGuard ],
  imports: [
    CommonModule
  ]
})
export class GuardsModule { }
