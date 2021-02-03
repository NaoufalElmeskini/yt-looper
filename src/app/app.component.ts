import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'YT-looper';
  private videoUrl: string;
  private showVideoReaderComponent: boolean;

  displayVideo() {
    console.log("this.videoUrl: ");
  }
}
