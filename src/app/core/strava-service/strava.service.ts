import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SummaryActivity } from '../../shared/models/strava/summaryactivity';

import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(private httpClient: HttpClient) { }

  _client_id = '49912';
  _client_secret = '84a5e674f6276b6da4d5a2a318624704e6c0546d';
  _grant_type = 'authorization_code';

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

  getHeroes(_access_token: string): Observable<SummaryActivity[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + _access_token
      }),
      params: new HttpParams()
        .set('per_page', 200)
    };

    const url = 'https://www.strava.com/api/v3/athlete/activities';
    return this.httpClient.get<SummaryActivity[]>(url, requestOptions);
  }
}