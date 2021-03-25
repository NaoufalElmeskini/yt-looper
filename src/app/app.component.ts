import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yt-looper';
  private API_URL = 'https://www.googleapis.com/youtube/v3/search';
  private API_KEY = '';

  constructor(httpClient: HttpClient) {}


}
