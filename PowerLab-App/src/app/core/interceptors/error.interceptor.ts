import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {

            switch (err.status) {
                case 400:
                    const message = Object.keys(err.error.errors)
                                    .map(e => err.error.errors[e])
                                    .join('\n') 
                    this.toastr.error(message, 'Warnng!')
                break;
                case 401:
                this.toastr.error(err.error.message, 'Warning!')
                break
            }

            return throwError(err)
        }))
    };

}