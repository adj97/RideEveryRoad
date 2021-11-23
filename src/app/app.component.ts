import { Component, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ride Every Road';
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(51.507570, -0.127811),
         zoom: 13,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

  StravaOAuth(): void {
    window.alert("Strava OAuth");
  }
}
