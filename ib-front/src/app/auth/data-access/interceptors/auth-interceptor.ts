import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { environment } from '../../../../environments/environment';

// we need an empty Injectable to allow it to get Injectable data
// @Injectable({ providedIn: 'root' })
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    console.log('attaching token');
    console.log(authToken);

    const isApiUrl = req.url.startsWith(environment.nestApiUrl);

    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + authToken,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      // 'Access-Control-Allow-Origin': '*',
    });

    if (isApiUrl) {
      const authRequest = req.clone({ headers });
      return next.handle(authRequest);
    }

    // const authRequest = req.clone({
    //   headers: req.headers.set('Authorization','Bearer ' + authToken)

    //    req.headers.set()
    // });
    return next.handle(req);
  }
}
