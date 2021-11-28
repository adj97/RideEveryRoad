import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../app.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private strava: StravaService) {
  }

  ngOnInit(): void {
  }

  code: string;
  scope: string[] = new Array(5);

  clientid = '49912';
  redirect_uri = 'http://localhost:4200/exchange_token'
  urlscope = 'read,activity:read_all,activity:read'

  // strava oauth (so) urls
  so_base_url = 'http://www.strava.com/oauth/'
  so_route = 'authorize'
  so_client_id = `client_id=${this.clientid}str`;
  so_response_type = 'response_type=code';
  so_redirect_url = `redirect_uri=${this.redirect_uri}`;
  so_approval_prompt = 'approval_prompt=forced';
  so_scope = `scope=${this.urlscope}`;
  strava_oauth_url = this.so_base_url + this.so_route + '?' + this.so_client_id + '&' + this.so_response_type + '&' + this.so_redirect_url + '&' + this.so_approval_prompt + '&' + this.so_scope

  StravaOAuth(){
    window.location.href = this.strava_oauth_url;
  }

  GetUrlQueryParams(){
    this.activatedRoute.queryParams.subscribe(params => {
      try {
        console.log(params);
        this.code = params.code;
        this.scope = params.scope.split(",");
      }
      catch{
        //
      }
    });
  }

  CheckScopes(){
    if (this.scope.includes("read") && this.scope.includes("activity:read_all") && this.scope.includes("activity:read")){
      console.log("Scopes are sufficient for the next API calls");
    }
  }

  access_token: string;

  GetAccessToken(){
    this.access_token = this.strava.sendPostRequest(this.clientid, this.code)
    console.log(this.access_token)
  }

  MakeApiCall(){
    this.strava.sendGetRequest(this.access_token);
  }

}
