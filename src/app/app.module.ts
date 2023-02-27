import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AdCardComponent } from './components/ads/ad-card/ad-card.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';
import { PostAdComponent } from './components/ads/post-ad/post-ad.component';
import { AdDetailComponent } from './components/ads/ad-detail/ad-detail.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { ToastrModule } from 'ngx-toastr';
import { CustomAlertComponent } from './components/custom-alert/custom-alert.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserAdsComponent } from './components/user/user-ads/user-ads.component';
import { TruncateTextPipe } from './_helpers/_pipes/truncateText.pipe';
import { AuthInterceptorProvider } from './_helpers/_interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdCardComponent,
    AdsListComponent,
    PostAdComponent,
    AdDetailComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    CustomAlertComponent,
    UserDashboardComponent,
    UserAdsComponent,
    TruncateTextPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
