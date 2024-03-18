import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { FaceAuthService } from '../services/face-auth.service';
import { ReplaySubject, filter, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-user-face',
  templateUrl: './register-user-face.page.html',
  styleUrls: ['./register-user-face.page.scss'],
})
export class RegisterUserFacePage {

  messages: Array<string> = [];

  private destroy$ = new ReplaySubject<boolean>(1);
  private startedCamera$ = this.cameraService.videoStreamBS
    .asObservable()
    .pipe(
      takeUntil(this.destroy$),
      filter(video => video !== null)
    );

  constructor(private cameraService: CameraService,
    private faceAuthService: FaceAuthService,
    private router: Router) { }

  startRegistration() {
    this.cameraService.startCamera();
  }

  ionViewWillEnter() {
    console.log('Entering user registration page');
    this.messages = [];
    this.destroy$ = new ReplaySubject<boolean>(1);

    this.faceAuthService.faceRegistrationStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe(status => {
        this.messages.push(status);
        if (status.includes('Successfully')) {
          this.redirectToSuccessfulRegistration();
        }
      });

    this.startedCamera$.subscribe(video => {
      if (video) {
        this.faceAuthService.registerFace(video);
      }
    });
  }

  ionViewWillUnload() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private redirectToSuccessfulRegistration() {
    setTimeout(() => {
      this.router.navigate(['/registration-successful']);
    }, 1000);
  }

}
