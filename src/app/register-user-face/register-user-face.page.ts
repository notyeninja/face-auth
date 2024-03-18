import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';

@Component({
  selector: 'app-register-user-face',
  templateUrl: './register-user-face.page.html',
  styleUrls: ['./register-user-face.page.scss'],
})
export class RegisterUserFacePage {

  constructor(private cameraService: CameraService) { }

  startRegistration() {
    this.cameraService.startCamera();
  }

}
