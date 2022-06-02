import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../ui/map-modal/map-modal.component';

import { environment } from '../../../../../environments/environment';
import { map, switchMap } from 'rxjs/operators';
import { PlaceLocation } from 'src/app/places/data-access/models/location.model';
import { of } from 'rxjs';

const GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
  @Output() locationPicked = new EventEmitter<PlaceLocation>();
  public selectedLocationImage = '';
  public isLoading = false;

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl.create({ component: MapModalComponent }).then((modalEl) => {
      modalEl.onDidDismiss().then((modalData) => {
        if (!modalData.data) {
          return;
        }

        const pickedLocation: PlaceLocation = {
          lat: modalData.data.lat,
          lng: modalData.data.lng,
          address: null,
          staticMapImageUrl: null,
        };
        this.isLoading = true;
        this.getAddress(modalData.data.lat, modalData.data.lng)
          .pipe(
            switchMap((address) => {
              pickedLocation.address = address;
              return of(
                this.getStaticMapImage(
                  pickedLocation.lat,
                  pickedLocation.lng,
                  14
                )
              );
            })
          )
          .subscribe((staticMapImageUrl) => {
            pickedLocation.staticMapImageUrl = staticMapImageUrl;
            this.selectedLocationImage = staticMapImageUrl;
            this.isLoading = false;
            this.locationPicked.emit(pickedLocation);
          });
        // this.getAddress(modalData.data.lat, modalData.data.lng).subscribe(
        //   (address) => {
        //     console.log(address);
        //   }
        // );
      });
      modalEl.present();
    });
  }

  private getStaticMapImage(lat: number, lng: number, zoom: number) {
    const size = '500x300';
    const mapType = 'roadmap';
    const aMarker = '&markers=color:red%7Clabel:C%7C40.718217,-73.998284';
    // eslint-disable-next-line max-len
    const fullAddress = `https://maps.googleapis.com/maps/api/staticmap?
center=${lat},${lng}&
zoom=${zoom}&
size=${size}&
maptype=${mapType}&
markers=color:red%7Clabel:S%7C${lat},${lng}&
key=${GOOGLE_MAPS_API_KEY}`;
    // const fullAddress = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},
    //${lng}&zoom=${zoom}&size=${size}&maptype=${mapType}&
    //markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}
    //&signature=YOUR_SIGNATURE`

    return fullAddress;
  }

  private getAddress(lat: number, lng: number) {
    const fullAddress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;

    return this.http.get<any>(fullAddress).pipe(
      map((geoData) => {
        if (!geoData || !geoData.results || geoData.results.length === 0) {
          return null;
        }
        return geoData.results[0].formatted_address;
      })
    );
  }
}
