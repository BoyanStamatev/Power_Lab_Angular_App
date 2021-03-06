import { Injectable } from '@angular/core'
import * as jwt_decode from '../../../../../node_modules/jwt-decode'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { RegisterModel } from '../../models/RegisterModel'
import { LoginModel } from '../../models/LoginModel'
import { AppState } from '../../store/app.state'
import { Store, select } from '@ngrx/store'
import { Authenticate, Deauthenticate } from '../../store/authentication/authentication.actions'
import { AuthenticationDataModel } from '../../models/AuthnticationDataModel'

const loginUrl = 'http://localhost:5000/auth/login'
const registerUrl = 'http://localhost:5000/auth/signup'

@Injectable()
export class AuthenticationService {

  private username: string
  private isUserAdmin : boolean
  private isUserAuthenticated: boolean

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) { 

    this.store.pipe(select(state => state.authentication.isAdmin))
      .subscribe(data => this.isUserAdmin = data)

    this.store.pipe(select(state => state.authentication.isAuthenticated))
      .subscribe(data => this.isUserAuthenticated = data)
      
    this.store.pipe(select(state => state.authentication.username))
      .subscribe(data => this.username = data)

    if (localStorage.getItem('authtoken')) {
      const token = localStorage.getItem('authtoken')

      try{
        const decoded = jwt_decode(token)
        if (!this.isTokenExpired(decoded)) {

          const authData: AuthenticationDataModel = {token: token, username: decoded.username, isAdmin: decoded.isAdmin, isAuthenticated: true}

          this.store.dispatch(new Authenticate(authData))
        }
      } catch (err){
        this.toastr.error('Invalid token', 'Warning!')
      }

    }
    
  }

  register(body: RegisterModel) {
    return this.http.post(registerUrl, body)
  }

  login(body: LoginModel) {
    return this.http.post(loginUrl, body)
  }

  logout() {
    localStorage.clear()
    this.store.dispatch(new Deauthenticate)
    this.toastr.success('Logout successful!')
    this.router.navigate(['/'])
  }

  isAuthenticated () {
    return this.isUserAuthenticated
  }

  isAdmin () {
    return this.isUserAdmin
  }

  getUsername () {
    return this.username
  }

  getToken() {
    const token = localStorage.getItem('authtoken')
    return token
  }

  isTokenExpired(token): boolean {
    if(token.exp === undefined) {
      return false
    }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)

    return !(date.valueOf() > new Date().valueOf())
  }

}
