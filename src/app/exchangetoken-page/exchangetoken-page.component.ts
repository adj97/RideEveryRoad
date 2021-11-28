import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StravaService } from '../strava.service';

@Component({
  selector: 'app-exchangetoken-page',
  templateUrl: './exchangetoken-page.component.html',
  styleUrls: ['../app.component.css']
})
export class ExchangetokenPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
    private stravaService: StravaService,
    private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.GetUrlQueryParams();
    this.CheckScopes();
    await this.GetAccessToken();
    this.navigateToMap();
  }

  code: string;
  scope: string[];
  access_token: string;

  GetUrlQueryParams(){
    this.activatedRoute.queryParams.subscribe(params => {
      try {
        this.code = params.code;
        this.scope = params.scope.split(",");
      }
      catch{
        //
      }
      console.log("Url params: code = " + this.code);
      console.log("Url params: scope(s) = " + this.scope);
    });
  }

  CheckScopes(){
    if (this.scope.includes("read") && this.scope.includes("activity:read_all") && this.scope.includes("activity:read")){
      console.log("Scopes are sufficient");
    }
    else{
      console.log("Insufficient scopes")
    }
  }

  async GetAccessToken(){
    this.access_token = await this.stravaService.getAccessToken(this.stravaService.clientid, this.code);
    console.log("Access token :" + this.access_token);
  }

  navigateToMap() {
    const navigationExtras: NavigationExtras = {
      state: {
        access_token: this.access_token,
        example: 'this is an example'
      }
    };
    this.router.navigate(['map'], navigationExtras);
 }

}