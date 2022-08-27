import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { SummaryActivity } from '../../shared/models/strava/summaryactivity';

import { catchError, first, firstValueFrom, Observable, throwError } from 'rxjs';
import { CookieService } from '../cookie-service/cookie-service.service';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router) { 
    }

  _client_id = '49912';
  _client_secret = '84a5e674f6276b6da4d5a2a318624704e6c0546d';
  _grant_type = 'authorization_code';

  oauth_token: string;

  try_auth_from_cache() {
    if (this.cookieService.check_exists('oauth_token')) {
      console.log('authenticate using cached token')
      this.oauth_token = this.cookieService.read('oauth_token')

      // try to use oauth_token in a test request
      if (this.get_authenticated_athlete()) {
        const navigationExtras: NavigationExtras = {
          state: {
            access_token: this.oauth_token,
            example: 'this is an example'
          }
        };
        this.router.navigate(['map'], navigationExtras);
      } else {
        console.log('cached auth hasnt worked')
        window.location.href = this.buildOAuthUrl();
      }
    } else {
      console.log('there is no cached oauth token')
      window.location.href = this.buildOAuthUrl();
    }
  }

  cache_access_token(token: string) {
    this.cookieService.create('oauth_token',token);
  }

  async get_authenticated_athlete(){
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oauth_token
      })
    }
    const get = this.httpClient
      .get('https://www.strava.com/api/v3/athlete', requestOptions)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // simple logging, but you can do a lot more, see below
          console.log('An error occurred:', err.error);
          return throwError(() => err);
        })
      );
    return get.subscribe({
      next: () => {return true},
      error: () => {}
    });
  }

  async getAccessToken(code: string){
    const body = {
      client_id: this._client_id,
      client_secret: this._client_secret,
      code: code,
      grant_type: this._grant_type
    }

    const post$ = this.httpClient.post('https://www.strava.com/api/v3/oauth/token', body);
    return await firstValueFrom(post$).then((res: any) => { return res.access_token });
  }

  async getAllActivities(_access_token: string){

    var activities: SummaryActivity[] = [];
    var pagenumber = 1;
    var response: any[];

    do{
      console.log(`getting page ${pagenumber}`)
      response = await this.getActivities(_access_token, pagenumber)
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

  buildOAuthUrl(): string {
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
      window.location.href.slice(0, -1),
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