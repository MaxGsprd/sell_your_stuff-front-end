import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { TokenService } from "src/app/services/token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.tokenService.getToken();

        if (token) {
            request = request.clone({
                setHeaders: { Authorization : `bearer ${token}`}
            });
        }
        return next.handle(request).pipe(
            catchError( (error) => {
                if(error.status === 401) {
                    this.tokenService.clearToken();
                }
                return throwError(() => new Error('Session expired'))
            })
        );
    }
}

export const AuthInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
}