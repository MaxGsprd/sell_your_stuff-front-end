import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdDetailComponent } from './components/ads/ad-detail/ad-detail.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';
import { PostAdComponent } from './components/ads/post-ad/post-ad.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';

const routes: Routes = [
  {path: '', component: AdsListComponent},
  {path: 'post-ad', component: PostAdComponent},
  {path: 'ad-detail/:id', component: AdDetailComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegistrationComponent},
  {path: '**', component: AdsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
