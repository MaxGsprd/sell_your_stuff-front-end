import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdDetailComponent } from './components/ads/ad-detail/ad-detail.component';
import { AdsListComponent } from './components/ads/ads-list/ads-list.component';
import { PostAdComponent } from './components/ads/post-ad/post-ad.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AuthGuard } from './_helpers/_guard/auth.guard';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { EditAdComponent } from './components/ads/edit-ad/edit-ad.component';
import { PhotoGalleryEditorComponent } from './components/ads/photo-gallery-editor/photo-gallery-editor.component';

const routes: Routes = [
  {path: '', component: AdsListComponent},
  {path: 'post-clad/:id', component: PostAdComponent, canActivate:[AuthGuard]},
  {path: 'clad-detail/:id', component: AdDetailComponent, canActivate:[AuthGuard]},
  {path: 'edit-clad/:id', component: EditAdComponent, canActivate:[AuthGuard]},
  {path: 'edit-photo-gallery/:id', component: PhotoGalleryEditorComponent, canActivate:[AuthGuard]},
  {path: 'signin', component: UserLoginComponent},
  {path: 'register', component: UserRegistrationComponent},
  {path: 'myDashboard/:id', component: UserDashboardComponent, canActivate:[AuthGuard]},
  {path: 'user-edit/:id', component: UserEditComponent, canActivate:[AuthGuard]},
  {path: '**', component: AdsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
