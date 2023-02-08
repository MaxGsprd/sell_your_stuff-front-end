import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AdCardComponent } from './components/ads/ad-card/ad-card.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';
import { PostAdComponent } from './components/ads/post-ad/post-ad.component';
import { AdDetailComponent } from './components/ads/ad-detail/ad-detail.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdCardComponent,
    AdsListComponent,
    PostAdComponent,
    AdDetailComponent,
    UserLoginComponent,
    UserRegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
