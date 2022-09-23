import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { SummaryActivity } from '../../shared/models/strava/summaryactivity';

import { catchError, first, firstValueFrom, Observable, throwError } from 'rxjs';
import { CookieService } from '../cookie-service/cookie-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// let instances = [];

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  refresh_token: string = "";
  access_token: string = "";
  access_token_expiry: string = "";
  authorisation_code: string = "";

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  _client_id: string = environment.app_client.id;
  _client_secret: string = environment.app_client.secret;

  async getAllActivities(){

    var activities: SummaryActivity[] = [];
    var pagenumber = 1;
    var response: any[];

    do{
      response = await this.getActivities(this.access_token, pagenumber)
      activities.push(...response)
      pagenumber++;
    } while(response.length == 200)

    return activities
  }

  async getActivities(_access_token: string, page: number){
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + _access_token
      }),
      params: new HttpParams()
        .set('per_page', 200)
        .set('page', page)
    };

    const url = 'https://www.strava.com/api/v3/athlete/activities';

    const get$ = this.httpClient.get<SummaryActivity[]>(url, requestOptions);

    return await firstValueFrom(get$)
  }

  refresh_token_is_cached(): boolean {
    if (this.cookieService.check_exists('oauth_refresh_token')){
      this.refresh_token = this.cookieService.read('oauth_refresh_token')
      return true
    } else {
      return false
    }
  }

  async update_tokens(): Promise<void> {
    await this.oauth_token_request({
      client_id: this._client_id,
      client_secret: this._client_secret,
      grant_type: "refresh_token",
      refresh_token: this.refresh_token
    });
  }

  async get_access_token(): Promise<void> {
    return this.oauth_token_request({
      client_id: this._client_id,
      client_secret: this._client_secret,
      code: this.authorisation_code,
      grant_type: "authorization_code"
    });
  }

  async oauth_token_request(post_body: {}){
    await firstValueFrom(
        this.httpClient.post('https://www.strava.com/api/v3/oauth/token', post_body)
      ).then(
        (res: any) => {
          this.access_token = res.access_token;
          this.access_token_expiry = res.expires_at;
          this.refresh_token = res.refresh_token;
        }
      );

      // save oauth refresh token in local browser cookies
      this.cookieService.write('oauth_refresh_token', this.refresh_token, 365);
  }

  oauth_url(): string {
    return "https://www.strava.com/oauth/authorize" +
      `?client_id=${this._client_id}` +
      "&response_type=code" +
      `&redirect_uri=${window.location.href.slice(0, -1)}/exchange_token` +
      "&approval_prompt=force" +
      "&scope=read,activity:read_all,activity:read"
  }

  initiate_oauth_flow(): void {
    window.location.href = this.oauth_url();
  }

  async get_activities_since(date: Date){

    var activities: SummaryActivity[] = [];
    var pagenumber = 1;
    var response: any[];

    var after_date_epoch = date.getTime()/1000

    do{
      console.log(`getting page ${pagenumber}`)
      response = await this.get_activities_with_params(pagenumber, after_date_epoch)
      console.log(response)
      activities.push(...response)
      pagenumber++;
    } while(response.length == 200)

    return activities.sort((a,b)=>(a.start_date > b.start_date) ? 1: -1)

  }

  async get_activities_with_params(page: number = 1, after: number){
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.access_token
      }),
      params: new HttpParams()
        .set('per_page', 200)
        .set('page', page)
        .set('after', after)
    };

    const url = 'https://www.strava.com/api/v3/athlete/activities';

    const get$ = this.httpClient.get<SummaryActivity[]>(url, requestOptions);

    return await firstValueFrom(get$)
  }
}