import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./feature/discover/discover.module').then(
                (m) => m.DiscoverPageModule
              ),
          },
          {
            path: '/:placeId',
            loadChildren: () =>
              import('./feature/place-details/place-details.module').then(
                (m) => m.PlaceDetailsPageModule
              ),
          },
        ],
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./feature/offers/offers.module').then(
                (m) => m.OffersPageModule
              ),
          },
          {
            path: 'new',
            loadChildren: () =>
              import('./feature/offer-new/offer-new.module').then(
                (m) => m.OfferNewPageModule
              ),
          },
          {
            path: 'edit/:placeId',
            loadChildren: () =>
              import('./feature/offer-edit/offer-edit.module').then(
                (m) => m.OfferEditPageModule
              ),
          },
        ],
      },
      { path: '', redirectTo: '/places/tabs/discover', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
