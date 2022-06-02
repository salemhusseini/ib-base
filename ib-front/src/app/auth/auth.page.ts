import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthCredentials } from './data-access/models/auth-credentials.model';
import { AuthService } from './data-access/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public isLoading = false;
  public isLogin = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  // onLogin() {
  //   // console.log('clicked');
  //   this.isLoading = true;
  //   this.loadingCtrl
  //     .create({ keyboardClose: true, message: 'Logging in...' })
  //     .then((loadingEl) => {
  //       loadingEl.present();
  //       setTimeout(() => {
  //         this.isLoading = false;
  //         loadingEl.dismiss();
  //         this.router.navigateByUrl('places/tabs/discover');
  //       }, 1000);
  //     });
  //   this.authService.login();
  // }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log('not valid form');
      return;
    }
    //const { value } = form.value;

    const authCredentials: AuthCredentials = {
      email: form.value.email,
      password: form.value.password,
    };
    console.log(form.value.email);

    console.log(`is login: ${this.isLogin}`);
    if (this.isLogin) {
      this.authService.login(authCredentials);
    } else {
      this.authService.signUp(authCredentials);
    }
  }
}
