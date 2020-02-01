import { Injectable } from '@angular/core'
import * as jwt_decode from '../../../../../node_modules/jwt-decode'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { RegisterModel } from '../../../components/authentication/models/RegisterModel'
import { LoginModel } from '../../../components/authentication/models/LoginModel'

const loginUrl = 'http://localhost:5000/auth/login'
const registerUrl = 'http://localhost:5000/auth/signup'

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { 

    if (localStorage.getItem('authtoken')) {
      const authtoken = localStorage.getItem('authtoken')

      try{
        const decoded = jwt_decode(authtoken)
        if (!this.isTokenExpired(decoded)) {
          // Dispach action Save token
        }
      } catch (err){
        this.toastr.error('Invalid token', 'Warning!')
      }

    }
  }


  isTokenExpired(token): boolean {
    if(token.exp === undefined) {
      return false
    }

    const date = new Date(0)
    date.setUTCSeconds(token.exp)

    return !(date.valueOf() > new Date().valueOf())
  }

  register(body: RegisterModel) {
    return this.http.post(registerUrl, body)
  }

  login(body: LoginModel) {
    return this.http.post(loginUrl, body)
  }

  logout() {
    localStorage.clear()
    // dispatch action to remove token
    this.toastr.success('Logout successful!')
    this.router.navigate(['/'])
  }

  isAuthenticated () {
    // check the store
  }

  isAdmin () {
    // check the store
  }

  getUsername () {
    // get it from the store
  }

  getToken() {
    const token = localStorage.getItem('authtoken')
    return token
  }


}
