import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionComponent } from './action/action.component';
import { VideoComponent } from './video/video.component';
import { YouTubePlayerModule} from '@angular/youtube-player';
import {EventBrokerModule} from "ng-event-broker";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ActionComponent,
    VideoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        YouTubePlayerModule,
        EventBrokerModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
