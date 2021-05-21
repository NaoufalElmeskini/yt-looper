export class VideoPortion {
  videoId: string;
  startingTime: number;
  endingTime: number;
  speed: number;

  constructor() {
    this.startingTime = 5;
    this.endingTime = 10;
    this.speed = 1;
  }
}
