import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Place } from '../models/place.model';

import { tap } from 'rxjs/operators';
import { Offer } from '../models/offer.model';
import { UpdatePlace } from '../models/update-place.model';

const BACKEND_URL = `${environment.nestApiUrl}/places`;

@Injectable()
export class PlacesService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(BACKEND_URL);
  }

  getAllAvailablePlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(BACKEND_URL + '/available');
  }

  getAllUserPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(BACKEND_URL + '/user');
  }

  getOnePlace(pid: string): Observable<Place> {
    console.log('get one place service');
    console.log(pid);
    return this.http.get<Place>(`${BACKEND_URL}/${pid}`);
    // .pipe(tap((result) => console.log(result)));
  }

  // getOneUserPlace() {
  //   return this.http.get<Place[]>(BACKEND_URL);
  // }

  createPlace(newOffer: Offer) {
    return this.http.post<Place>(BACKEND_URL, newOffer);
  }

  updatePlace(pid: string, updatedPlace: UpdatePlace) {
    return this.http.patch<Place>(`${BACKEND_URL}/${pid}`, updatedPlace);
  }

  bookPlace() {}

  removeAllPlaces() {
    return this.http.delete<Place>(`${BACKEND_URL}/clear-all`);
  }

  removeAllUserPlaces() {
    return this.http.delete<Place>(`${BACKEND_URL}/all`);
  }

  removeOneUserPlace(pid: string) {
    return this.http.delete<Place>(`${BACKEND_URL}/${pid}`);
  }
}
