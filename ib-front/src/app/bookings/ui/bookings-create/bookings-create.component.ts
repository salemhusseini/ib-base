import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IonDatetime,
  LoadingController,
  ModalController,
} from '@ionic/angular';

import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { Place } from 'src/app/places/data-access/models/place.model';

@Component({
  selector: 'app-bookings-create',
  templateUrl: './bookings-create.component.html',
  styleUrls: ['./bookings-create.component.scss'],
})
export class BookingsCreateComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';

  // @ViewChild(IonDatetime, { static: true }) popoverDatetime: IonDatetime;

  dateValue = '';

  public form = this.fb.group({
    fName: ['', { updateOn: 'blur', validators: [Validators.required] }],
    lName: ['', { updateOn: 'blur', validators: [Validators.required] }],
    numberOfGuests: [
      '',
      { updateOn: 'blur', validators: [Validators.required] },
    ],
    dateFrom: ['', { updateOn: 'blur', validators: [Validators.required] }],
    dateTo: ['', { updateOn: 'blur', validators: [Validators.required] }],
    // someDate: ['', { updateOn: 'blur', validators: [Validators.required] }],
  });

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // this.form.patchValue({
    //   numberOfGuests: 'd43e854f-445d-41a4-85bb-d38d192bb1f1',
    // });
    //console.log('in booking create');
    //console.log(this.selectedPlace);
  }
  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    console.log('On Book Place');
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }

    // const newDateFrom = new Date(this.form.get('dateFrom').value).toUTCString();
    // const newDateTo = new Date(this.form.get('dateTo').value).toISOString();

    const payload = {
      // dateFrom: newDateFrom,
      // dateTo: newDateTo,
      ...this.form.value,
    };

    this.modalCtrl.dismiss({ payload }, 'confirm');
  }

  // DATE STUFF
  // confirm() {
  //   this.popoverDatetime.confirm();
  // }

  // reset() {
  //   this.popoverDatetime.reset();
  // }

  // formatDate(value: string) {
  //   return format(parseISO(value), 'MMM dd yyyy');
  // }
}
