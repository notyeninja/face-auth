import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit, OnDestroy {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  private videoElement!: HTMLVideoElement;

  private destroySub$ = new ReplaySubject<boolean>(1);

  constructor(private cameraService: CameraService) { }

  async ngAfterViewInit() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        {
          video: true,
          audio: false
        });
      this.videoElement = this.videoPlayer.nativeElement;
      this.videoElement.srcObject = stream;
    } catch (error) {
      console.error(`Error during getting video stream, ${error}`);
    }

    // subscribe to the state of the camera
    this.cameraService.cameraState$
      .pipe(takeUntil(this.destroySub$))
      .subscribe(state => {
        if (state) {
          this.videoElement.play();
          this.cameraService.videoStreamBS.next(this.videoElement);
        } else {
          this.videoElement.pause();
          this.cameraService.videoStreamBS.next(null);
        }
      })
  }

  ngOnDestroy() {
    this.destroySub$.next(true);
    this.destroySub$.complete();
  }
}
