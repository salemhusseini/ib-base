import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferEditPage } from './offer-edit.page';

const routes: Routes = [
  {
    path: '',
    component: OfferEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferEditPageRoutingModule {}
