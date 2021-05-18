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
  public YT: any;
  public video: any;
  public player: any;
  public reframed = false;

  private videoPortion: VideoPortion;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(private eventService: EventBrokerService) {}


  ngOnInit() {
    this.video = 'nRiOw3qGYq4';
    this.init();

    this.eventService.subscribeEvent(Events.videoPause).subscribe(() => { this.pauseVideo(); });
    this.eventService.subscribeEvent(Events.videoPlay).subscribe((data) => {
      this.videoPortion = data;
      console.log({data});
      this.playVideo();
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
    this.player = new window.YT.Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      }
    });
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
    console.log('event received: videoPause.');
    this.player.pauseVideo();
  }

  playVideo() {
    console.log('event received: videoPlay.');
    this.player.destroy();
    this.updatePlayerWithVideoPortion(this.videoPortion);
    this.player.playVideo();
  }

  isValueBetween(value: number, min: number, max: number): boolean {
    return (value >= min && value <= max);
  }

  updatePlayerWithVideoPortion(videoPortion: VideoPortion) {
    console.log({videoPortion});

    this.player = new window.YT.Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
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


}
