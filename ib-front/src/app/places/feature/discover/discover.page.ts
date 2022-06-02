import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingController, SegmentChangeEventDetail } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Place } from '../../data-access/models/place.model';
import { PlacesService } from '../../data-access/services/places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverPage implements OnInit {
  public places$: Observable<Place[]>;

  constructor(
    private placesService: PlacesService,
    private loadingCtrl: LoadingController
  ) {
    this.places$ = placesService.getAllPlaces().pipe(
      tap((something) => {
        console.log('something');
        console.log(something);
      })
    );
  }

  ionViewDidEnter() {
    console.log('entered dis');
  }

  ngOnInit() {}
  async onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    const loadingEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...',
    });

    await loadingEl.present();

    console.log('selected:', event.detail.value);
    const mode = event.detail.value;
    if (mode === 'bookable') {
      this.places$ = this.placesService.getAllAvailablePlaces();
    } else {
      this.places$ = this.placesService.getAllPlaces();
    }
    loadingEl.dismiss();
  }
}
