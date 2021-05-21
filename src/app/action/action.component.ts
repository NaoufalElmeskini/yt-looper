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

  doesPlayerNeedUpdate = true;

  constructor(private eventService: EventBrokerService) { }

  ngOnInit() {
    this.initJS();
    this.initVideoPortion();

    this.generateCustomElement();
  }

  private initVideoPortion() {
    this.videoPortion = new VideoPortion();

    console.log(this.videoPortion);
  }

  pauseOrPlayVideo() {
    console.log('videoPlaying = ' + this.isVideoPlaying);
    if (this.isVideoPlaying) {
      this.sendVideoPauseEvent();
    } else {
      this.sendAVideoPlayEvent();
    }
    this.switchState();
  }

  private sendAVideoPlayEvent() {
    if (this.doesPlayerNeedUpdate) {
      this.sendVideoPlayWithUpdateEvent();
    } else {
      this.sendVideoPlayEvent();
    }
  }

  private sendVideoPlayEvent() {
    console.log('sending event: videoPlay');
    this.eventService.publishEvent(Events.videoPlay);
  }

  private sendVideoPlayWithUpdateEvent() {
    console.log('sending event: videoPlayWithUpdate');
    this.eventService.publishEvent(Events.videoPlayWithUpdate, this.videoPortion);
    this.doesPlayerNeedUpdate = false;
  }

  private sendVideoPauseEvent() {
    console.log('sending event: videoPause');
    this.eventService.publishEvent(Events.videoPause);
  }

  switchState() {
    this.isVideoPlaying = !this.isVideoPlaying;
  }

  private initJS() {

    console.log('initJS()');
  }

  private generateCustomElement() {

  }
}
