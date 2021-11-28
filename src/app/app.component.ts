import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { } from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Ride Every Road';
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  strava_oauth_clientid = '49912'
  strava_oauth_url = `http://www.strava.com/oauth/authorize?client_id=${this.strava_oauth_clientid}str&response_type=code&redirect_uri=http://localhost:4200/exchange_token&approval_prompt=force&scope=read`

  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(51.507570, -0.127811),
         zoom: 13,
         mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }

  StravaOAuth(): void {
    window.location.href = this.strava_oauth_url
  }
}
