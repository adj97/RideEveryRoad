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
  }

  StravaOAuth() {
    let oauth_url = this.BuildStravaOAuthUrl(window.location.href)
    window.location.href = oauth_url;
  }

  BuildStravaOAuthUrl(redirect_base_uri: string): string {

    const url_sep = [
      'https:/',
      'www.strava.com',
      'oauth'
    ];

    let qp = ['authorize'];
    
    let redirect_uri_components = [
      'http:/',
      'localhost:4200',
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

