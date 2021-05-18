import { Component, OnInit } from '@angular/core';
import {EventBrokerService} from "ng-event-broker";
import {Events} from "../../models/events.model";
import {VideoPortion} from "../../models/video-portion.model";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  isVideoPlaying = true;
  videoPortion: VideoPortion;

  constructor(private eventService: EventBrokerService) { }

  ngOnInit() {
    this.initJS();
    this.initVideoPortion();
  }

  private initVideoPortion() {
    this.videoPortion = new VideoPortion();

    console.log(this.videoPortion);
  }

  pauseOrPlayVideo() {
    console.log('videoPlaying = ' + this.isVideoPlaying);
    if (this.isVideoPlaying) {
      console.log('sending event: videoPause');
      this.eventService.publishEvent(Events.videoPause);
    } else {
      console.log('sending event: videoPlay');
      this.eventService.publishEvent(Events.videoPlay, this.videoPortion);
    }
    this.switchState();
  }

  switchState() {
    this.isVideoPlaying = !this.isVideoPlaying;
  }

  private initJS() {

    console.log('initJS()');
  }
}
