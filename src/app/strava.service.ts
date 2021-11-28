import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(private http: HttpClient) { }

  sendPostRequest(_clientid: string, _code: string) {

    const body = {
      client_id: _clientid,
      client_secret: "84a5e674f6276b6da4d5a2a318624704e6c0546d",
      code: _code,
      grant_type: "authorization_code"
    }

    var access_token: string;

    const t = this.http.post<any>('https://www.strava.com/api/v3/oauth/token', body).subscribe(res => { console.log(res.access_token); access_token = res.access_token; });

    return access_token
  }

  sendGetRequest(_access_token: string) {
    const headerDict = {
      'Authorization': 'Bearer ' + _access_token,
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    const url = 'https://www.strava.com/api/v3/athlete/activities';

    return this.http
      .get(url, requestOptions)
      .subscribe(res => {
        console.log(res);
      })
  }
}