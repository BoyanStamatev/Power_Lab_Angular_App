import {
  CanLoad,
  Router
} from '@angular/router'
import { Injectable } from '@angular/core'

import { AuthenticationService } from '../../services/authentication/authentication.service'
import { Route } from '@angular/compiler/src/core'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  canLoad(route: Route) {

    if (this.authService.isAdmin()) {
      return true
    }

    this.router.navigate(['/'])
    return false
  };

}
