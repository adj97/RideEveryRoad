import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StravaService } from '../../core/strava-service/strava.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class LandingPageComponent {

  constructor(
    private stravaService: StravaService,
    private router: Router
  ) {}

  async startAuthFlow(){
    // check for cached refresh token
    // this saves the token if its found
    if (this.stravaService.refresh_token_is_cached()){
      // get a new access and refresh token
      await this.stravaService.update_tokens()

      // go to map page
      this.router.navigate(['map'])

    } else {
      // do normal oauth flow
      this.stravaService.initiate_oauth_flow()
        // this flow will request auth from user manually,
        // then return to exchangetoken-page,
        // save AT & RT
        // and finally go to map page
    }

  }
}
