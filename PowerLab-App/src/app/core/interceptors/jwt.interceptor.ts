import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators'
import * as jwt_decode from '../../../../node_modules/jwt-decode'


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(!req.url.endsWith('/auth/login') || !req.url.endsWith('/auth/signup')) {

            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${this.authenticationService.getToken}`
                }
            })
        }

        return next.handle(req).pipe(tap((res: HttpEvent<any>) => {
            if(res instanceof HttpResponse && res.body.success && req.url.endsWith('/auth/signup')) {
                this.saveToken(res.body)
            }
        }))

    }

    private saveToken(data) {

        if(this.decodeToken(data.token)) {
            const authtoken = data.token
            // Action
            localStorage.setItem('authtoken', authtoken)
            this.toastr.success(data.message)
        } else {
            this.toastr.error('Invalid token', 'Warning!')
        }
    }

    private decodeToken(token) {
        try {
            jwt_decode(token)
            return true
        } catch {
            return false
        }
    }

}