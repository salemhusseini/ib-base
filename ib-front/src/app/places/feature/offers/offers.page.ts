import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Place } from '../../data-access/models/place.model';
import { PlacesService } from '../../data-access/services/places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  public places$: Observable<Place[]>;
  constructor(placesService: PlacesService) {
    this.places$ = placesService.getAllUserPlaces().pipe(
      tap((something) => {
        console.log('something');
        console.log(something);
      })
    );
  }

  ngOnInit() {}
}
