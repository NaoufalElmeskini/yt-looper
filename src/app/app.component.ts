import { Component } from '@angular/core';
import {EventBrokerService} from "ng-event-broker";
import {Events} from "../models/events.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yt-looper';
  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_KEY = '';

  constructor(private eventService: EventBrokerService) {}

  ngOnInit() {
    this.registerAppEvents();
  }


  private registerAppEvents() {
    this.eventService.registerEvent(Events.videoPause);
    this.eventService.registerEvent(Events.videoPlay);
    this.eventService.registerEvent(Events.videoPlayWithUpdate);
  }
}
