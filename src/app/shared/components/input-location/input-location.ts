import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-input-location',
  imports: [NgIf,GoogleMapsModule],
  templateUrl: './input-location.html',
  styleUrl: './input-location.scss'
})
export class InputLocation {
latitude = 24.7136;
  longitude = 46.6753;
  zoom = 8;
  clickedLat: number | null = null;
  clickedLng: number | null = null;

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.latitude = pos.coords.latitude;
          this.longitude = pos.coords.longitude;
        },
        (err) => {
          console.error('لم يتم الحصول على الموقع:', err);
        }
      );
    }
  }

  mapClicked(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.clickedLat = event.latLng.lat();
      this.clickedLng = event.latLng.lng();
    }
  }
}
