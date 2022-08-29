import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SummaryActivity } from '../../shared/models/strava/summaryactivity';

import { firstValueFrom, Observable } from 'rxjs';
import { CookieService } from '../cookie-service/cookie-service.service';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService) { }

  _client_id = '49912';
  _client_secret = '84a5e674f6276b6da4d5a2a318624704e6c0546d';
  _grant_type = 'authorization_code';

  oauth_token: string;

  try_auth_from_cache() {
    if (this.cookieService.check_exists('oauth_token')) {
      console.log('authenticate using cached token')
      this.oauth_token = this.cookieService.read('oauth_token')
    } else {
      console.log('there is no cached oauth token')
    }
  }

  cache_access_token(token: string) {
    this.cookieService.create('oauth_token',token);
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
}