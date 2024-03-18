import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private cameraBS = new BehaviorSubject<boolean>(false);
  cameraState$ = this.cameraBS.asObservable();

  constructor() { }

  startCamera() {
    this.cameraBS.next(true);
  }

  stopCamera() {
    this.cameraBS.next(false);
  }
}