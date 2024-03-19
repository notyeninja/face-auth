import { Component, OnInit } from '@angular/core';
import { FaceAuthService } from '../services/face-auth.service';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.page.html',
  styleUrls: ['./login-success.page.scss'],
})
export class LoginSuccessPage {

  authenticatedUser: string = '';
  constructor(private authService: FaceAuthService) { }

  ionViewWillEnter() {
    this.authenticatedUser = this.authService.getUserDetails();
  }
}
