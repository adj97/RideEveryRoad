import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { StravaService } from '../../core/strava-service/strava.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class LandingPageComponent implements OnInit {

  public stravaOAuthUrlString: string;

  constructor(private stravaService: StravaService) {
  }

  ngOnInit(): void { }

  startAuthFlow(){
    // check for cached token
    this.stravaService.try_auth_from_cache();

  }
}
