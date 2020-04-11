import {
    CanLoad,
    Router,
 } from '@angular/router'
 import { Injectable } from '@angular/core'
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
 
 import { AuthenticationService } from '../../services/authentication/authentication.service'
 import { LoginModalComponent } from '../../../components/authentication/login-modal/login-modal.component'
import { Route } from '@angular/compiler/src/core'
 
 @Injectable({
   providedIn: 'root'
 })
 export class AuthLazyGuard implements CanLoad {
 
   constructor(
     private authService: AuthenticationService,
     private router: Router,
     private modalService: NgbModal ) { }
 
    canLoad(route: Route){

        if (this.authService.isAuthenticated()) {
            return true
          }
      
          this.router.navigate(['/'])
          this.openLoginModal()
          return false
    };

 
   openLoginModal() {
     const loginRef = this.modalService.open(LoginModalComponent)
     loginRef.result
     .then((results) => { 
      //  console.log(results) 
      })
     .catch((error) => { 
       console.log(error) 
      })
   }
 }
 