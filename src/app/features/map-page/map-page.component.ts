import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { } from 'googlemaps';
import { LocalstorageService } from 'src/app/core/localstorage-service/localstorage.service';
import { SummaryActivity } from 'src/app/shared/models/strava/summaryactivity';
import { StravaService } from '../../core/strava-service/strava.service';
import { SpinnerDialog } from '../dialogs/spinner-dialog/spinner-dialog.component';
import { CryptoService } from 'src/app/core/crypto-service/crypto.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class MapPageComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;
  activities: SummaryActivity[] = [];
  encryption_key: string = "E2XNdpaAVDaAHkrzjuar"

  // encoding/decoding module object
  polyline = require('@mapbox/polyline')

  constructor(
    private stravaService: StravaService,
    private dialog: MatDialog,
    private localStorageService: LocalstorageService,
    private cryptoService: CryptoService
  ) { }

  async ngOnInit(){
    const loading_dialog_ref = this.dialog.open(SpinnerDialog);

    this.map = this._initialise_map()

    // read localstorage data
    // save last_pulled_date for pulling efficiency
    var raw_cached_data: string = this.localStorageService.get('cached_activity_data')
    if (raw_cached_data) {
      var cached_activity_data: SummaryActivity[] = JSON.parse(raw_cached_data)
      var last_pulled_date = new Date(cached_activity_data[cached_activity_data.length-1].start_date)
    } else {
      var cached_activity_data: SummaryActivity[] = []
      var last_pulled_date = new Date(2000,1,1)
    }

    var new_activity_data = await this.stravaService.get_activities_since(last_pulled_date)

    // append new data to cached activities array
    this.activities = cached_activity_data.concat(new_activity_data)

    // update localstorage with last pulled
    this.localStorageService.delete('cached_activity_data')
    this.localStorageService.write('cached_activity_data', this.activities)

    this._plot_results()

    loading_dialog_ref.close();
  }

  _initialise_map(){
    const zoom_level: number = 13;
    const center_lat: number = 51.507570;
    const center_lng: number = -0.127811;
    const map_type: string = google.maps.MapTypeId.ROADMAP;

    return new google.maps.Map(this.mapElement.nativeElement, {
      center: new google.maps.LatLng(center_lat, center_lng),
      zoom: zoom_level,
      mapTypeId: map_type
    });
  }

  _plot_results(){

    // bounds behavior
    const bb_options = ["last", "all"]
    const bb = bb_options[0]

    // create blank bounds array
    // extend to the min/max of each activity
    var bounds = new google.maps.LatLngBounds()

    for (var activity of this.activities){

      // skip activities without a polyline
      if (activity.map == null){
        continue
      } else if (activity.map.summary_polyline == ""){
        continue
      }

      // get a polyline summary
      var polyline_string = activity.map.summary_polyline;

      // decode and refactor custom function
      var coordinates = this._decode_polyline(polyline_string)

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

      this._attach_activity_hyperlink(flightPath, activity.id);
    }

    // apply bounds to your map
    if (bb == bb_options[0]){
      bounds = new google.maps.LatLngBounds(min_coords, max_coords)
    } 
    this.map.fitBounds(bounds); 
  }

  _attach_activity_hyperlink(polyline: google.maps.Polyline, activityid: number) {
    polyline.addListener("click", () => {
      window.open(`https://www.strava.com/activities/${activityid}`)
    })
  }

  _decode_polyline(polylinestring: string){
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
