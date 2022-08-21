import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { StravaService } from '../../core/strava-service/strava.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../../app.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private stravaService: StravaService) {
  }

  ngOnInit(): void {
    this.setStravaOAuthUrlString();
    this.stravaService.try_auth_from_cache();
  }

  public stravaOAuthUrlString: string;

  setStravaOAuthUrlString() {
    let redirect_base_uri = window.location.href.slice(0, -1);
    this.stravaOAuthUrlString = this.BuildStravaOAuthUrl(redirect_base_uri);
  }

  BuildStravaOAuthUrl(redirect_base_uri: string): string {
    const url_sep = [
      'https:/',
      'www.strava.com',
      'oauth'
    ];

    let qp = ['authorize'];

    // using redirect_base_uri here as window.location.href means the oauth flow will redirect back to the current base
    // this would mean that launching the app from localhost or stackblitz would redirect accordingly
    // however the strava api client is restricted to one authorisation callback domain
    // either set this to localhost or gqailggqx.github.stackblitz.io (e.g.) to use either
    let redirect_uri_components = [
      redirect_base_uri,
      'exchange_token'
    ];

    const params_dict = {
      client_id: 49912,
      response_type: 'code',
      redirect_uri: redirect_uri_components.join('/'),
      approval_prompt: 'force',
      scope: ['read', 'activity:read_all', 'activity:read'].join(',')
    };

    qp.push(Object.keys(params_dict).map(o=>o + '=' + params_dict[o]).join('&'))

    url_sep.push(qp.join('?'))

    return url_sep.join('/');
  }
}
