import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';

import { AuthService } from '../auth/data-access/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  lala: number;
  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    console.log(Capacitor.isPluginAvailable('SplashScreen'));
    this.authService.autoAuthUser();
    this.platform.ready().then(async () => {
      console.log('it is ready');
      // await SplashScreen.show({
      //   autoHide: false,
      // });
      // await SplashScreen.show({
      //   showDuration: 2000,
      //   autoHide: true,
      // });
    });
  }

  onLogout() {
    this.authService.logout();
    console.log('logged out');
  }
}
