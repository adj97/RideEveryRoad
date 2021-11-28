import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(51.507570, -0.127811),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  title = 'Ride Every Road';

  strava_oauth_clientid = '49912';
  strava_oauth_url = `http://www.strava.com/oauth/authorize?client_id=${this.strava_oauth_clientid}str&response_type=code&redirect_uri=http://localhost:4200/exchange_token&approval_prompt=force&scope=read`;

  StravaOAuth(): void {
    window.location.href = this.strava_oauth_url
  }

}
