import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { } from 'googlemaps';
import { SummaryActivity } from 'src/app/shared/models/strava/summaryactivity';
import { StravaService } from '../../core/strava-service/strava.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;
  bounds: google.maps.LatLngBounds;
  
  constructor(private stravaService: StravaService, private router: Router, public dialog: MatDialog) {
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
    this.loadAndPlot();
  }

  async loadAndPlot(){
    await this.MakeApiCall();
    this.PlotResults();
  }

  activities: SummaryActivity[] = [];

  async MakeApiCall() {
    const dialogRef = this.dialog.open(DialogComponent);
    let response = await this.stravaService.getAllActivities(this.access_token)
    this.activities = response;
    dialogRef.close();
  }

  PlotResults(){

    for (var activity of this.activities){

      // skip activities without a polyline
      if (activity.map.summary_polyline == null){
        continue
      }

      // get a polyline summary
      var polyline_string = activity.map.summary_polyline;

      // decode and refactor custom function
      var coordinates = this._decodePolyline(polyline_string)

      // add google maps polyline
      var flightPath = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 0.4,
        strokeWeight: 3,
        map: this.map
      });

      this.attachActivityHyperlink(flightPath, activity.id);
    }
  }

  attachActivityHyperlink(polyline: google.maps.Polyline, activityid: number) {
    polyline.addListener("click", () => {
      window.open(`https://www.strava.com/activities/${activityid}`)
    })
  }

  // encoding/decoding module object
  polyline = require('@mapbox/polyline')

  _decodePolyline(polylinestring: string){
    // decode using the above module object
    var polyline_string_decoded = this.polyline.decode(polylinestring)

    // convert type into dict-array
    const flightPlanCoordinates = [];
    for (var i in polyline_string_decoded){
      flightPlanCoordinates.push(
        { 
          lat: polyline_string_decoded[i][0],
          lng: polyline_string_decoded[i][1]
        })
    }

    return flightPlanCoordinates
  }
}
