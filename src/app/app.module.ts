import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostingCardComponent } from './components/posting/posting-card/posting-card/posting-card.component';
import { PostingDetailComponent } from './components/posting/posting-detail/posting-detail/posting-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PostingCardComponent,
    PostingDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
