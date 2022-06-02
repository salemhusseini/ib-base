/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCredentials } from '../models/auth-credentials.model';

import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { AuthLoginResponse } from '../models/auth-login-response.model';
import { AuthSaveData } from '../models/auth-save-data.model';
import { LoadingController } from '@ionic/angular';

const BACKEND_URL = `${environment.nestApiUrl}`;
const AUTH_URL = BACKEND_URL + '/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _userIsAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private _userId: string;
  private authStatusListener = new Subject<boolean>();

  // OLD
  // private _userIsAuthenticated = false;
  // private _userId = '1ea97412-b4a1-4039-8d62-d9b541f84dc7';

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  // OLD
  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this._userIsAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // SIGNUP USER
  async signUp(authCredentials: AuthCredentials) {
    const loadingEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...',
    });
    await loadingEl.present();
    console.log('in signup service');
    console.log(authCredentials);
    console.log(AUTH_URL);

    //const authData: AuthData = { email: email, password: password };
    this.http
      .post<AuthLoginResponse>(AUTH_URL + '/signup', authCredentials)
      .subscribe(
        () => {
          console.log('in post');
          loadingEl.dismiss();
          this.router.navigateByUrl('places/tabs/discover');
        },
        (error) => {
          loadingEl.dismiss();
          console.log(error);
          this.authStatusListener.next(false);
        }
      );
  }

  async login(authCredentials: AuthCredentials) {
    const loadingEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...',
    });

    await loadingEl.present();

    this.router.navigateByUrl('places/tabs/discover');

    console.log('in login service');
    console.log(`got ${JSON.stringify(authCredentials)}`);
    //const authData: AuthCredentials = { email: email, password: password };
    this.http
      .post<AuthLoginResponse>(AUTH_URL + '/login', authCredentials)
      .subscribe(
        (response) => {
          console.log(response);
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this._userIsAuthenticated = true;
            this._userId = response.uid;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );

            const authSaveData: AuthSaveData = {
              token: response.token,
              expirationDate,
              uid: response.uid,
            };
            // console.log(authSaveData);
            this.saveAuthData(authSaveData);
            loadingEl.dismiss();
            this.router.navigate(['/']);
          }
        },
        (error) => {
          loadingEl.dismiss();
          console.log('some error');

          this.authStatusListener.next(false);
        }
      );
  }
  logout() {
    this.clearAuthData();
    this.authStatusListener.next(false);
    this._userIsAuthenticated = false;
    this.router.navigateByUrl('auth');
  }

  autoAuthUser() {
    console.log('Auto Auth User Poped');

    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this._userIsAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  // STORAGE
  private saveAuthData(authSaveData: AuthSaveData) {
    localStorage.setItem('token', authSaveData.token);
    localStorage.setItem(
      'expirationDate',
      authSaveData.expirationDate.toISOString()
    );
    localStorage.setItem('userId', authSaveData.uid);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
    };
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
