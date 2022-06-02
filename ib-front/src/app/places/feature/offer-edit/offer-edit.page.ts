import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Place } from '../../data-access/models/place.model';
import { PlacesService } from '../../data-access/services/places.service';

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.page.html',
  styleUrls: ['./offer-edit.page.scss'],
})
export class OfferEditPage implements OnInit {
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
  });

  placeId = '';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeId = paramMap.get('placeId');
      this.placesService
        .getOnePlace(this.placeId)
        .subscribe((returnedPlace: Place) => {
          console.log(returnedPlace);

          this.form.patchValue(returnedPlace);
        });
    });
  }

  async onUpdatePlace() {
    if (this.form.invalid) {
      return;
    }
    const loadingEl = await this.loadingCtrl.create({
      keyboardClose: true,
      message: 'Logging in...',
    });
    await loadingEl.present();

    this.placesService.updatePlace(this.placeId, this.form.value).subscribe(
      (offer: Place) => {
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
}
