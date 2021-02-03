import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-video-reader',
  templateUrl: './video-reader.component.html',
  styleUrls: ['./video-reader.component.css']
})
export class VideoReaderComponent implements OnInit {
  private myUrl: SafeResourceUrl;
  myURlInput: string = 'initialize-me';
  //https://www.youtube.com/embed/6KV7p3QtM9g

  constructor(private _sanitizer: DomSanitizer, private route: ActivatedRoute) {
    // this.myUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/6KV7p3QtM9g');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('videoUrl'));
    })
  }

}
