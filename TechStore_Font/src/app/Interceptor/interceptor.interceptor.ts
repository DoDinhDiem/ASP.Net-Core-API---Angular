import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private account: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.account.getToken();

    if (myToken) {
      const cloned = request.clone(request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      }));

      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
