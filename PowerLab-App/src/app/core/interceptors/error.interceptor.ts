import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {

            switch (err.status) {
                case 400:
                case 401:
                    if (req.url.endsWith('/auth/signup') || req.url.endsWith('/auth/login')) {
                        this.spinner.hide()
                      }
                    if (err.error.errors) {
                      const message = Object.keys(err.error.errors)
                        .map(e => err.error.errors[e])
                        .join('\n')
                      this.toastr.error(message, 'Warning!')
                    } else {
                      this.toastr.error(err.error.message, 'Warning!')
                    }
                    break
            }

            return throwError(err)
        }))
    };

}