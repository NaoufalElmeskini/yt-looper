import { Component, OnInit } from '@angular/core';
import {EventBrokerService} from "ng-event-broker";
import {Events} from "../events.model";

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private eventService: EventBrokerService) { }

  ngOnInit() {
  }

  pauseOrPlayVideo() {
    console.log('publishing...');
    this.eventService.publishEvent(Events.videoPause, 12);
    console.log('videoPause event published.');
  }
}
