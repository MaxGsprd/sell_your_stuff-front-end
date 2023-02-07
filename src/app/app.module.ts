import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AdCardComponent } from './components/ads/ad-card/ad-card.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdCardComponent,
    AdsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
