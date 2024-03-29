import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MapPageComponent } from './features/map-page/map-page.component';

import { HttpClientModule } from '@angular/common/http';
import { ExchangetokenPageComponent } from './features/exchangetoken-page/exchangetoken-page.component';


import { SpinnerDialog } from './features/dialogs/spinner-dialog/spinner-dialog.component';

import {MaterialDesignModule} from '../materialdesign.module';
import { FeedbackDialogComponent } from './features/dialogs/feedback-dialog/feedback-dialog.component';
import { StravaInfoDialogComponent } from './features/dialogs/stravainfo-dialog/stravainfo-dialog.component';

import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MapPageComponent,
    ExchangetokenPageComponent,
    SpinnerDialog,
    FeedbackDialogComponent,
    StravaInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    MaterialDesignModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
