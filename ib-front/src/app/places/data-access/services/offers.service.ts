import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer.model';

import { tap } from 'rxjs/operators';

const BACKEND_URL = `${environment.nestApiUrl}/offers`;

@Injectable()
export class OffersService {
  constructor(private http: HttpClient, private router: Router) {}
  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${BACKEND_URL}/offers`);
  }

  getOneOffer(pid: string): Observable<Offer> {
    // console.log(pid);
    return this.http
      .get<Offer>(`${BACKEND_URL}/offers/${pid}`)
      .pipe(tap((result) => console.log(result)));
  }

  createOffer(newOffer: Offer) {
    return this.http.post<Offer>(BACKEND_URL, newOffer);
  }
}
