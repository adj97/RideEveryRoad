import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { } from 'googlemaps';
import { SummaryActivity } from 'src/app/shared/models/strava/summaryactivity';
import { StravaService } from '../../core/strava-service/strava.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;
  bounds: google.maps.LatLngBounds;
  
  constructor(private stravaService: StravaService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      access_token: string
    };
    console.log("Access token : " + state.access_token);
    this.access_token = state.access_token;
  }

  access_token:string;
  gm_center_lat = 51.507570;
  gm_center_lng = -0.127811;

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(this.gm_center_lat,this.gm_center_lng),
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
    this.print = this.activities[0].name;
    console.log(this.print)
  }

  PlotResults(){
    console.log("PlotResults");

    var polyline = this.activities[0].map.summary_polyline;
    console.log(polyline);
    const polyline_decrypted = google.maps.geometry.encoding.decodePath(polyline);
    console.log(polyline_decrypted);

    const flightPlanCoordinates = [
      { lat: 51.507570, lng: -0.137811 },
      { lat: 51.607570, lng: -0.147811 },
      { lat: 51.707570, lng: -0.157811 },
      { lat: 51.587570, lng: -0.167811 },
      { lat: 51.407570, lng: -0.177811 },
      { lat: 51.557570, lng: -0.187811 },
      { lat: 51.527570, lng: -0.1987811 }
    ];
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
  
    flightPath.setMap(this.map);
  }
}
