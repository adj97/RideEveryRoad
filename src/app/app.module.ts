import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MapPageComponent } from './features/map-page/map-page.component';

import { HttpClientModule } from '@angular/common/http';
import { ExchangetokenPageComponent } from './features/exchangetoken-page/exchangetoken-page.component';


import { DialogComponent } from './features/dialog/dialog.component';

import {MaterialDesignModule} from '../materialdesign.module';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MapPageComponent,
    ExchangetokenPageComponent,
    DialogComponent,
    FeedbackDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    MaterialDesignModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
