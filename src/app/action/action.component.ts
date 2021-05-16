import { Component, OnInit } from '@angular/core';
import {EventBrokerService} from "ng-event-broker";
import {Events} from "../events.model";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  videoState = 'paused';

  constructor(private eventService: EventBrokerService) { }

  ngOnInit() {
  }

  pauseOrPlayVideo() {
    console.log('publishing...');
    console.log('videoState: ' + this.videoState);

    if (this.videoState === 'paused') {
      this.eventService.publishEvent(Events.videoPause);
    } else {
      this.eventService.publishEvent(Events.videoPlay);
    }
    this.switchState();
  }

  switchState() {
    if (this.videoState === 'paused') {
      this.videoState = 'playing';
    } else {
      this.videoState = 'paused';
    }
  }
}
