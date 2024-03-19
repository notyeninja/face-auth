import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { FaceAuthService } from '../services/face-auth.service';
import { Router } from '@angular/router';
import { ReplaySubject, filter, takeUntil } from 'rxjs';
import { CameraState } from '../models/camera.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  messages: Array<string> = [];
  authInProgress: boolean = false;
  private destroy$ = new ReplaySubject<boolean>(1);
  private startedCamera$ = this.cameraService.videoStreamBS
    .asObservable()
    .pipe(
      takeUntil(this.destroy$),
      filter(video => video !== null)
    );

  constructor(private cameraService: CameraService, private authService: FaceAuthService, private router: Router) { }

  authenticateUser() {
    this.cameraService.startCamera();
  }

  ionViewWillEnter() {
    this.authService.faceAuthenticationStatus$
      .pipe(
        takeUntil(this.destroy$),
        filter(status => status !== '')
      )
      .subscribe(status => {
        this.messages.push(status);
        this.authInProgress = true;

        if (status.includes('Authorized')) {
          this.authInProgress = false;
          this.stopCamera();
          this.redirectToSuccess();
        } else if (status.includes('Not Authorized')) {
          this.authInProgress = false;
          this.stopCamera();
          this.redirectToUnauthorized();
        }
      });

    this.startedCamera$.subscribe(video => {
      if (video) {
        this.authService.authenticateUser(video);
      }
    });
  }

  ionViewWillUnload() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private redirectToSuccess() {
    setTimeout(() => {
      this.router.navigate(['/login-success']);
    }, 500);
  }

  private redirectToUnauthorized() {
    setTimeout(() => {
      this.router.navigate(['/login-failed']);
    }, 500);
  }

  private stopCamera() {
    this.cameraService.stopCamera();
  }
}
