import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapModalComponent } from './ui/map-modal/map-modal.component';
import { LocationPickerComponent } from './feature/location-picker/location-picker.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MapModalComponent, LocationPickerComponent],
  imports: [CommonModule, IonicModule],
  exports: [MapModalComponent, LocationPickerComponent],
})
export class MapLocationModule {}
