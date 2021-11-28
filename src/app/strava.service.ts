import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  async sendGetRequest(_access_token: string) {
    const headerDict = {
      'Authorization': 'Bearer ' + _access_token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const url = 'https://www.strava.com/api/v3/athlete/activities';

    return await this.httpClient
      .get(url, requestOptions)
      .toPromise()
      .then((res: any) => { return res })
  }
}