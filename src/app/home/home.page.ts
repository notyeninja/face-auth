import { Component } from '@angular/core';
import { FaceAuthService } from '../services/face-auth.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  modelLoaded: boolean = false;
  destroy$ = new ReplaySubject<boolean>(1);
  constructor(private authService: FaceAuthService) { }

  ionViewWillEnter() {
    this.destroy$ = new ReplaySubject<boolean>();
    this.authService.faceAuthModelLoadedStatus$.pipe(takeUntil(this.destroy$))
      .subscribe(state => this.modelLoaded = state);
  }

  ionViewWillUnload() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
