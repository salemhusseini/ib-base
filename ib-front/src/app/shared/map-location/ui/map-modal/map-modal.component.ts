import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

import { environment } from '../../../../../environments/environment';

const GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapElementRef: ElementRef;
  @Input() center = { lat: -34.397, lng: 150.644 };
  @Input() selectable = true;
  @Input() closeButtonText = 'Cancel';
  @Input() title = 'Pick Location';

  mapElementRefClickListenerHandler: any;
  googleMaps: any;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then((googleMaps) => {
        console.log('in getting google maps');
        this.googleMaps = googleMaps;

        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: this.center,
          zoom: 16,
        });
        this.googleMaps.event.addListenerOnce(map, 'idle', () => {
          console.log('in listener Once');

          this.renderer.addClass(mapEl, 'visible');
        });

        if (this.selectable) {
          this.mapElementRefClickListenerHandler = map.addListener(
            'click',
            (event) => {
              const selectedCoords = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              };
              this.modalCtrl.dismiss(selectedCoords);
            }
          );
        } else {
          const marker = new googleMaps.Marker({
            position: this.center,
            map,
            title: 'Picked Location',
          });
          marker.setMap(map);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  ngOnDestroy(): void {
    if (this.mapElementRefClickListenerHandler) {
      this.googleMaps.event.removeListener(
        this.mapElementRefClickListenerHandler
      );
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          console.log(`loadedGoogleModule === true`);

          resolve(loadedGoogleModule.maps);
        } else {
          console.log(`loadedGoogleModule === false`);
          reject('Google Maps SDK not available');
        }
      };
    });
  }
}
