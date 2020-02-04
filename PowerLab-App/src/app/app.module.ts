import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { ServicesModule } from './core/services/services.module'
import { AuthenticationModule } from './components/authentication/authentication.module'
import { SharedModule } from './components/shared/shared.module'
import { HomeComponent } from './components/home/home.component'
import { ProductsModule } from './components/products/products.module'
import { JWTInterceptor, ErrorInterceptor } from './core/interceptors'
import { ToastrModule } from 'ngx-toastr'
import { StoreModule, ActionReducer } from '@ngrx/store'
import { AppState } from './core/store/app.state'
import { storeLogger } from 'ngrx-store-logger'
import { appReducers } from './core/store/app.reducers'

import { environment } from '../environments/environment'
export function logger(reducer: ActionReducer<AppState>): any {
  return storeLogger()(reducer)
}
export const metaReducers = environment.production ? [] : [logger]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot(appReducers, {metaReducers}),
    ToastrModule.forRoot(),
    ServicesModule,
    AuthenticationModule,
    SharedModule,
    ProductsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
