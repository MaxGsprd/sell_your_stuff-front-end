import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem("authToken");

        if (token) {
            req = req.clone({
                setHeaders: { Authorization : `Bearer ${token}`}
            });
        }
        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
}