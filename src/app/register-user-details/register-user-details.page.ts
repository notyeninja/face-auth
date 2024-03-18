import { Component, OnInit } from '@angular/core';
import { FaceAuthService } from '../services/face-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user-details',
  templateUrl: './register-user-details.page.html',
  styleUrls: ['./register-user-details.page.scss'],
})
export class RegisterUserDetailsPage {

  userName: string = '';
  constructor(private faceAuthService: FaceAuthService, private router: Router) { }

  saveUserName() {
    if (this.userName !== '') {
      this.faceAuthService.setUserDetails(this.userName);
      setTimeout(() => {
        this.router.navigate(['/register-user-face']);
      }, 1000);
    }
  }

  ionViewWillEnter() {
    this.userName = '';
    this.faceAuthService.setUserDetails(this.userName);
  }
}
