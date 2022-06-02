import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PlaceLocation } from '../../data-access/models/location.model';
import { Offer } from '../../data-access/models/offer.model';

import { PlacesService } from '../../data-access/services/places.service';

@Component({
  selector: 'app-offer-new',
  templateUrl: './offer-new.page.html',
  styleUrls: ['./offer-new.page.scss'],
})
export class OfferNewPage implements OnInit {
  public form = this.fb.group({
    title: ['', { updateOn: 'blur', validators: [Validators.required] }],
    price: [
      '',
      {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)],
      },
    ],
    description: [
      '',
      {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)],
      },
    ],
    dateAvailableFrom: [
      '',
      { updateOn: 'blur', validators: [Validators.required] },
    ],
    dateAvailableTo: [
      '',
      { updateOn: 'blur', validators: [Validators.required] },
    ],
    location: ['', { validators: [Validators.required] }],
  });

  constructor(
    private fb: FormBuilder,
    private placesServices: PlacesService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}
  async onCreateOffer() {
    if (this.form.invalid) {
      return;
    }
    const loadingEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...',
    });
    await loadingEl.present();

    this.placesServices.createPlace(this.form.value).subscribe(
      (offer: Offer) => {
        console.log(offer);

        loadingEl.dismiss();
      },
      (err) => {
        loadingEl.dismiss();
      }
    );

    console.log(this.form.value);

    console.log('creating stuff');
  }

  onLocationPicked(location: PlaceLocation) {
    console.log(location);
    this.form.patchValue({ location });
    //this.form.patchValue({ location: JSON.stringify(location) });
  }
}
