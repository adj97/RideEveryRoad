import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MapPageComponent } from './map-page/map-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'exchange_token', component: LandingPageComponent },
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
