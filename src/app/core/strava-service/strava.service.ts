import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SummaryActivity } from '../../shared/models/strava/summaryactivity';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(private httpClient: HttpClient) { }

  clientid = '49912';

  async getAccessToken(_clientid: string, _code: string){
    const body = {
      client_id: _clientid,
      client_secret: "84a5e674f6276b6da4d5a2a318624704e6c0546d",
      code: _code,
      grant_type: "authorization_code"
    }
    return await this.httpClient
      .post('https://www.strava.com/api/v3/oauth/token', body)
      .toPromise()
      .then((res: any) => {
        return res.access_token
      });
  }

  getHeroes(_access_token: string): Observable<SummaryActivity[]> {
    const headerDict = {
      'Authorization': 'Bearer ' + _access_token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const url = 'https://www.strava.com/api/v3/athlete/activities';
    return this.httpClient.get<SummaryActivity[]>(url, requestOptions);
  }
}