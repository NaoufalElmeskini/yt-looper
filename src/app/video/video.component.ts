import { Component, OnInit } from '@angular/core';
import {EventBrokerService} from 'ng-event-broker';
import {Events} from '../../models/events.model';
import {VideoPortion} from "../../models/video-portion.model";
import {YouTubePlayer} from "@angular/youtube-player";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  title = 'dummyApp-YTIFrameAPI';
  showVideo = true;

  /* 1. Some required variables which will be used by YT API*/
  public player: any;
  public reframed = false;

  private videoPortion: VideoPortion;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(private eventService: EventBrokerService) {}


  ngOnInit() {

    this.subscribeToInitVideo();
    this.subscribeToPauseEvent();
    this.subscribeToPlayEvent();
    this.subscribeToPlayWithUpdateEvent();
  }

  private subscribeToPlayWithUpdateEvent() {
    this.eventService.subscribeEvent(Events.videoPlayWithUpdate).subscribe((data) => {
      console.log('event received: videoPlayWithUpdate');
      this.videoPortion = data;
      this.updateAndPlayVideo();
    });
  }

  private subscribeToPlayEvent() {
    this.eventService.subscribeEvent(Events.videoPlay).subscribe(() => {
      console.log('event received: videoPlay');
      this.player.playVideo();
    });
  }

  private subscribeToPauseEvent() {
    this.eventService.subscribeEvent(Events.videoPause).subscribe(() => {
      console.log('event received: videoPause.');
      this.pauseVideo();
    });
  }

  /* 2. Initialize method for YT IFrame API */
  init() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    console.log(document.getElementsByTagName('script'));
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window.onYouTubeIframeAPIReady = () => this.startVideo();
  }


  startVideo() {
    this.reframed = false;
    this.updateAndPlayVideo();
  }


  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  onPlayerStateChange(event) {
    console.log(event);
    switch (event.data) {
      case window.YT.PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window.YT.PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        }
        break;
      case window.YT.PlayerState.ENDED:
        console.log('ended ');
        this.player.seekTo(this.videoPortion.startingTime, true);
        // this.player.playVideo();
        break;
    }
  }


  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  updateAndPlayVideo() {
    if (this.player) {
      this.player.destroy();
    }
    this.updatePlayerWithVideoPortion(this.videoPortion);
    this.player.playVideo();
  }

  isValueBetween(value: number, min: number, max: number): boolean {
    return (value >= min && value <= max);
  }

  updatePlayerWithVideoPortion(videoPortion: VideoPortion) {
    this.player = new window.YT.Player('player', {
      videoId: this.videoPortion.videoId,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 0,
        rel: 0,
        showinfo: 0,
        fs: 1,
        playsinline: 1,
        start: this.videoPortion.startingTime,
        end: this.videoPortion.endingTime
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      }
    });
  }

  private subscribeToInitVideo() {

    this.eventService.subscribeEvent(Events.videoInit).subscribe((data) => {
      console.log('event received: videoInit');
      this.videoPortion = data;
      console.log(this.videoPortion);

      this.init();
    });
  }
}
