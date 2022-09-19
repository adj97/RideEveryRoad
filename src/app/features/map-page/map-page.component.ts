import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { } from 'googlemaps';
import { SummaryActivity } from 'src/app/shared/models/strava/summaryactivity';
import { StravaService } from '../../core/strava-service/strava.service';
import { SpinnerDialog } from '../dialogs/spinner-dialog/spinner-dialog.component';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;
  bounds: google.maps.LatLngBounds;

  constructor(
    private stravaService: StravaService,
    public dialog: MatDialog) { 
    }

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
    let loadingDialogRef = await this.MakeApiCall();
    this.PlotResults();
    loadingDialogRef.close();
  }

  activities: SummaryActivity[] = [];

  async MakeApiCall() {
    const dialogRef = this.dialog.open(SpinnerDialog);
    let response = await this.stravaService.getAllActivities()
    this.activities = response;
    return dialogRef
  }

  PlotResults(){

    // bounds behavior
    const bb_options = ["last", "all"]
    const bb = bb_options[0]

    // create blank bounds array
    // extend to the min/max of each activity
    var bounds = new google.maps.LatLngBounds()

    for (var activity of this.activities.reverse()){

      // skip activities without a polyline
      if (activity.map == null){
        continue
      }

      // get a polyline summary
      var polyline_string = activity.map.summary_polyline;

      // decode and refactor custom function
      var coordinates = this._decodePolyline(polyline_string)

      // get new latlngbounds
      var lat = coordinates.map(function(p) {return p.lat});
      var lng = coordinates.map(function(p) {return p.lng});
      var min_coords = new google.maps.LatLng({
        lat : Math.min.apply(null, lat),
        lng : Math.min.apply(null, lng)
      })
      var max_coords = new google.maps.LatLng({
          lat : Math.max.apply(null, lat),
          lng : Math.max.apply(null, lng)
      })
      if (bb == bb_options[1]){
        // show all data
        bounds.extend(min_coords)
        bounds.extend(max_coords)
      }

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

    // apply bounds to your map
    if (bb == bb_options[0]){
      bounds = new google.maps.LatLngBounds(min_coords, max_coords)
    } 
    this.map.fitBounds(bounds); 
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
