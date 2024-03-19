import { Component, OnInit } from '@angular/core';
import { FaceAuthService } from '../services/face-auth.service';

@Component({
  selector: 'app-registration-successful',
  templateUrl: './registration-successful.page.html',
  styleUrls: ['./registration-successful.page.scss'],
})
export class RegistrationSuccessfulPage {

  userName: string = '';
  constructor(private authService: FaceAuthService) { }

  ionViewWillEnter() {
    this.userName = this.authService.getUserDetails();
  }
}
