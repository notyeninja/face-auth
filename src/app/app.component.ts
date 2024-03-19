import { AfterViewInit, Component } from '@angular/core';
import { FaceAuthService } from './services/face-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private faceAuthService: FaceAuthService) { }

  async ngAfterViewInit() {
    try {
      await this.faceAuthService.loadModels();
      this.faceAuthService.setModelLoaded(true);
    } catch (e) {
      console.error(e);
    }
  }
}
