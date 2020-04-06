import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators'
import * as jwt_decode from '../../../../node_modules/jwt-decode'
import { AppState } from '../store/app.state';
import { Store, select } from '@ngrx/store';
import { AuthenticationDataModel } from '../models/AuthnticationDataModel';
import { Authenticate } from '../store/authentication/authentication.actions';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    private authtoken: string

    constructor(
        private store: Store<AppState>,
        private toastr: ToastrService
    ) { 

        this.store.pipe(select(state => state.authentication.token))
        .subscribe(data => this.authtoken = data)
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(!req.url.endsWith('/auth/login') || !req.url.endsWith('/auth/signup')) {

            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${this.authtoken}`
                }
            })
        }

        return next.handle(req).pipe(tap((res: HttpEvent<any>) => {
            if(res instanceof HttpResponse && res.body.success && req.url.endsWith('/auth/login')) {
                this.saveToken(res.body)
            }

            if (res instanceof HttpResponse && res.body.success && req.url.endsWith('/auth/signup')) {
                this.toastr.success(res.body.message)
              }
        }))

    }

    private saveToken(data) {

        if(this.decodeToken(data.token)) {
            const authtoken = data.token
            localStorage.setItem('authtoken', authtoken)
            this.toastr.success(data.message)
        } else {
            this.toastr.error('Invalid token', 'Warning!')
        }
    }

    private decodeToken(token) {
        try {
            const decoded = jwt_decode(token)
            const authData: AuthenticationDataModel = {token: token, username: decoded.username, isAdmin: decoded.isAdmin, isAuthenticated: true}
            this.store.dispatch(new Authenticate(authData))
            return true
        } catch {
            return false
        }
    }

}