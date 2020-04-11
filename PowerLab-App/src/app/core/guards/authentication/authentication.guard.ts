import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree, 
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'src/app/components/authentication/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
constructor(
  private authService: AuthenticationService,
  private router: Router,
  private modalService: NgbModal
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isAuthenticated()) {
      return true
    }

    this.router.navigate(['/'])
    this.openLoginModal()
    return false
  }

  openLoginModal() {
    const loginRef = this.modalService.open(LoginModalComponent)
    loginRef.result.then(res => {
      // console.log(res);
    }).catch (err => {
      console.log(err);
    })
  }
  
}
