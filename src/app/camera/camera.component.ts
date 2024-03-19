import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject, filter, takeUntil } from 'rxjs';
import { CameraAction, CameraState } from '../models/camera.models';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  private videoElement: HTMLVideoElement | null = null;

  private destroySub$ = new ReplaySubject<boolean>(1);
  private cameraInitAction$ = this.cameraService.cameraAction$
    .pipe(
      takeUntil(this.destroySub$),
      filter(action => action === CameraAction.INIT)
    );
  private cameraStartAction$ = this.cameraService.cameraAction$
    .pipe(
      takeUntil(this.destroySub$),
      filter(action => action === CameraAction.START)
    );
  private cameraStopAction$ = this.cameraService.cameraAction$
    .pipe(
      takeUntil(this.destroySub$),
      filter(action => action === CameraAction.STOP)
    );

  constructor(private cameraService: CameraService) { }

  ngOnInit(): void {
    console.log('Inside on init of camera component');
    this.cameraStartAction$.subscribe(async (v) => {
      await this.startCamera();
      this.cameraService.cameraState(CameraState.STARTED);
      this.cameraService.videoStreamBS.next(this.videoElement);
    });

    this.cameraStopAction$.subscribe((v) => {
      this.stopCamera();
      this.cameraService.cameraState(CameraState.STOPPED);
      this.cameraService.videoStreamBS.next(null);
    });
  }

  ngAfterViewInit() {
    console.log('Inside after view init of camera component');
    if (this.videoPlayer) {
      console.log('Vide element initialize inside camera component');
      this.cameraService.cameraState(CameraState.READY);
    }
  }

  ngOnDestroy() {
    console.log(`Destoying subscription in camera component`);
    this.destroySub$.next(true);
    this.destroySub$.complete();
  }

  private subscribeToCameraState() {
    this.cameraService.cameraAction$
      .pipe(takeUntil(this.destroySub$))
      .subscribe(startCamera => {
        if (startCamera) {
          if (startCamera) {
            this.startCamera();
          } else {
            this.stopCamera();
          }
        }
      })
  }

  private async startCamera() {
    if (!this.videoElement) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          {
            video: true,
            audio: false
          });
        this.videoElement = this.videoPlayer.nativeElement;
        if (this.videoElement) {
          this.videoElement.srcObject = stream;
          this.videoElement.play();
        }
      } catch (error) {
        console.error(`Error during getting video stream, ${error}`);
      }
    }
  }

  private stopCamera() {
    console.log('Inside stop camera method in camera component');
    if (this.videoElement) {
      console.log('Stopping Camera and setting it to null');
      this.videoElement.pause();
      this.videoElement.srcObject = null;
    }
  }

}
