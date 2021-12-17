import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { MapPageComponent } from './features/map-page/map-page.component';

import { HttpClientModule } from '@angular/common/http';
import { ExchangetokenPageComponent } from './features/exchangetoken-page/exchangetoken-page.component';

import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './features/dialog/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MapPageComponent,
    ExchangetokenPageComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
