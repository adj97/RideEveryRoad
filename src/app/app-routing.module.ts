import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangetokenPageComponent } from './features/exchangetoken-page/exchangetoken-page.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MapPageComponent } from './features/map-page/map-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'exchange_token', component: ExchangetokenPageComponent },
  { path: 'map', component: MapPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
