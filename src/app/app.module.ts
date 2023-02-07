import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AdCardComponent } from './components/ads/ad-card/ad-card.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';
import { PostAdComponent } from './components/ads/post-ad/post-ad.component';
import { AdDetailComponent } from './components/ads/ad-detail/ad-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdCardComponent,
    AdsListComponent,
    PostAdComponent,
    AdDetailComponent
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
