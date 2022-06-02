import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  //canActivate():
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('in guard');

    if (!this.authService.userIsAuthenticated) {
      // console.log('not authenticated');

      this.router.navigateByUrl('/auth');
    }
    return this.authService.userIsAuthenticated;
  }
}
