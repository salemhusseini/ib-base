import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Booking } from 'src/app/bookings/data-access/models/booking.model';
import { BookingsService } from 'src/app/bookings/data-access/services/bookings.service';
import { BookingsCreateComponent } from 'src/app/bookings/ui/bookings-create/bookings-create.component';
import { MapModalComponent } from 'src/app/shared/map-location/ui/map-modal/map-modal.component';
import { Place } from '../../data-access/models/place.model';
import { PlacesService } from '../../data-access/services/places.service';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  public place$: Observable<Place>;
  public placeId: string;
  private selectedPlace: Place;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private placesService: PlacesService,
    private bookingService: BookingsService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.get('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
      }
      console.log(paramMap.get('placeId'));
      this.placeId = paramMap.get('placeId');
      this.place$ = this.placesService
        .getOnePlace(paramMap.get('placeId'))
        .pipe(
          tap((payload) => {
            if (payload) {
              this.selectedPlace = payload;
            }
          })
        );
    });
  }

  async onBookPlaceActionSheet(placeObj: Place) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Some Options',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal(placeObj, 'select');
          },
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal(placeObj, 'random');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
        // {
        //   text: 'Delete',
        //   role: 'destructive',
        //   icon: 'trash',
        //   data: { type: 'delete' },
        //   handler: () => {
        //     console.log('delete clicked');
        //   },
        // },
      ],
    });

    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log(`Done: ${role} and ${JSON.stringify(data)}`);
  }

  async openBookingModal(place: Place, mode: 'select' | 'random') {
    console.log(mode);
    const bookingCreateModal = await this.modalCtrl.create({
      component: BookingsCreateComponent,
      componentProps: { selectedPlace: place, selectedMode: mode },
    });

    await bookingCreateModal.present();

    const result = await bookingCreateModal.onDidDismiss();

    if (result.role === 'confirm') {
      console.log('Role: ', result.role);
      console.log('Data: ', result.data);
      const newBooking = {
        placeId: this.placeId,
        ...result.data.payload,
      } as Booking;
      this.bookingService
        .createBooking(newBooking)
        .subscribe((returnedBooking) => {
          console.log('Returned Booking');
          console.log(returnedBooking);
          this.navCtrl.navigateBack('/bookings');
        });
    }

    // .then((modalEl) => {
    //   modalEl.present();
    //   return modalEl.onDidDismiss();
    // })
    // .then((resultData) => {
    //   console.log(resultData.data, resultData.role);
    //   if (resultData.role === 'confirm') {
    //     console.log('BOOKED!');
    //   }
    // });
  }
  onShowFullMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
        componentProps: {
          center: {
            lat: this.selectedPlace.location.lat,
            lng: this.selectedPlace.location.lng,
          },
          selectable: false,
          closeButtonText: 'Close',
          title: this.selectedPlace.location.address,
        },
      })
      .then((modalEl) => {
        modalEl.present();
      });
  }
}
