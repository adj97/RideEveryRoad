import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StravaService } from '../../core/strava-service/strava.service';

@Component({
  selector: 'app-exchangetoken-page',
  template: '',
  styleUrls: ['../../app.component.css']
})
export class ExchangetokenPageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private stravaService: StravaService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.scopes_are_sufficient()){
      await this.stravaService.get_access_token();
      this.router.navigate(['map']);
    } else {
      throw new Error('Scopes prescribed are insufficient');
    }
  }

  scopes_are_sufficient(): boolean{
    // initialise scopes array
    var scopes: string[] = [];

    // read query parameters from url
    this.activatedRoute.queryParams.subscribe(params => {
      try {
        this.stravaService.authorisation_code = params.code;
        scopes = params.scope.split(",");
      }
      catch{
        throw new Error('Unable to parse query parameters from Strava OAuth');
      }
    });

    // check scopes for read, activity:read_all and activity:read
    return (
      scopes.includes("read") && 
      scopes.includes("activity:read_all") && 
      scopes.includes("activity:read")
    )
  }
}