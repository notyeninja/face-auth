import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CameraAction, CameraActionType, CameraState, CameraStateType } from '../models/camera.models';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private cameraActionBS = new BehaviorSubject<CameraActionType>(CameraAction.INIT);
  cameraAction$ = this.cameraActionBS.asObservable();

  private cameraReadyBS = new BehaviorSubject<CameraStateType>(CameraState.UNKNOWN);
  cameraReady$ = this.cameraReadyBS.asObservable();

  videoStreamBS = new BehaviorSubject<HTMLVideoElement | null>(null);
  constructor() { }

  startCamera() {
    this.cameraActionBS.next(CameraAction.START);
  }

  stopCamera() {
    this.cameraActionBS.next(CameraAction.STOP);
  }

  cameraState(ready: CameraStateType) {
    this.cameraReadyBS.next(ready);
    // when camera is stopped then video feed is destroyed.
    if (!ready) {
      this.cameraActionBS.next(CameraAction.INIT);
    }
  }
}
