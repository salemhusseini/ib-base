import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferEditPageRoutingModule } from './offer-edit-routing.module';

import { OfferEditPage } from './offer-edit.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    OfferEditPageRoutingModule,
  ],
  declarations: [OfferEditPage],
})
export class OfferEditPageModule {}
