import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { } from 'googlemaps';
import { SummaryActivity } from 'src/app/shared/models/strava/activity';
import { StravaService } from '../../core/strava-service/strava.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;

  constructor(private stravaService: StravaService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      access_token: string
    };
    console.log("Access token : " + state.access_token);
    this.access_token = state.access_token;
  }

  access_token:string;

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(51.507570, -0.127811),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }

  activities: SummaryActivity[] = [];
  print: string;

  async MakeApiCall() {
    let response = this.stravaService.getHeroes(this.access_token)
    response.subscribe(activities => {
      this.activities = activities;
    });
  }

  ShowResults(){
    this.print = this.activities[0].name
    console.log(this.activities)
  }
}
