import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  constructor() { }

  async ngAfterViewInit() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement;
      videoElement.srcObject = stream;
    } catch (error) {
      console.error(`Error during getting video stream, ${error}`);
    }
  }
}
