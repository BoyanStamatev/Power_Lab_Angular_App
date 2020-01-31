import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component'
import { ServicesModule } from './core/services/services.module'
import { AuthenticationModule } from './components/authentication/authentication.module'
import { SharedModule } from './components/shared/shared.module'
import { HomeComponent } from './components/home/home.component'
import { ProductsModule } from './components/products/products.module'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    ServicesModule,
    AuthenticationModule,
    SharedModule,
    ProductsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
