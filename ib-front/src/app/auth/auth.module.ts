import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthInterceptor } from './data-access/interceptors/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthPage } from './auth.page';
import { AuthService } from './data-access/services/auth.service';
import { AuthGuard } from './data-access/guards/auth.guard';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AuthPageRoutingModule],
  declarations: [AuthPage],
  providers: [
    // AuthService,
    // AuthGuard,
  ],
  // exports: [AuthService, AuthGuard],
})
export class AuthPageModule {}
