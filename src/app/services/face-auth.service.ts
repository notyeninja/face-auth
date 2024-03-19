import { Injectable } from '@angular/core';
import { FaceMatcher, TinyFaceDetectorOptions, detectSingleFace, loadFaceLandmarkTinyModel, loadFaceRecognitionModel, loadTinyFaceDetectorModel, nets } from 'face-api.js';
import { BehaviorSubject, Observable, ReplaySubject, Subject, interval, takeUntil } from 'rxjs';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class FaceAuthService {

  private stopFaceDetection$ = new ReplaySubject<boolean>(1);
  private faceDetectionInterval$?: Observable<number> = undefined;
  private registerFaceDescriptor: Float32Array[] = [];
  private readonly REQUIRED_CONFIDENCE_LEVEL = 95;
  private faceRegistrationBS = new Subject<string>();
  private faceAuthenticationBS = new Subject<string>();
  private faceAuthModelLoadedBS = new BehaviorSubject<boolean>(false);
  private faceDetectionConfidenceLevel = 0;
  private readonly DEFAULT_AUTH_TRIES = 3;
  private authTries = 0;
  private userName = '';


  faceRegistrationStatus$ = this.faceRegistrationBS.asObservable();
  faceAuthenticationStatus$ = this.faceAuthenticationBS.asObservable();
  faceAuthModelLoadedStatus$ = this.faceAuthModelLoadedBS.asObservable();

  constructor() { }

  setUserDetails(userName: string) {
    this.userName = userName;
  }

  getUserDetails(): string {
    return this.userName;
  }

  setModelLoaded(isLoaded: boolean) {
    this.faceAuthModelLoadedBS.next(isLoaded);
  }

  registerFace(video: HTMLVideoElement | null) {
    this.faceRegistrationBS.next('Started face registration...');
    // start detecting face at an interval
    // stop when high quality face is detected.
    if (!this.faceDetectionInterval$) {
      this.initFaceDetectionLoop();
    }

    this.faceDetectionInterval$!.subscribe(async () => {
      if (video) {
        const detectedFace = await this.detectFace(video);
        if (detectedFace) {
          this.registerFaceDescriptor.push(detectedFace.descriptor);
          this.stopFaceDetectionLoop();
          video = null;
          this.faceRegistrationBS.next('Successfully registered face. Redirecting user...');
        }
      }
    });
  }

  authenticateUser(video: HTMLVideoElement) {
    console.log(`INside authenticate user method`);
    if (this.registerFaceDescriptor.length == 0) {
      this.faceAuthenticationBS.next('No user is registered. Please register an user');
      return;
    }

    this.resetAuthTries();
    this.initFaceDetectionLoop();
    // get the reference face to match.
    const faceMatcher = new FaceMatcher(this.registerFaceDescriptor);
    this.faceAuthenticationBS.next('Authenticating...');
    this.faceDetectionInterval$!.subscribe(async () => {
      console.log('Inside the face detection loop');
      const detectedFace = await this.detectFace(video);
      if (detectedFace) {
        const bestMatch = faceMatcher.findBestMatch(detectedFace.descriptor);
        this.authTries -= 1;
        const authorizedUser = !(bestMatch.label === 'unknown' || bestMatch.distance > 0.6);

        console.log(`Best match: Label: ${bestMatch.label},  Distance: ${bestMatch.distance}, Tries: ${this.authTries}`);

        if (authorizedUser) {
          // if system detect is authorized face then mark it successfull
          this.faceAuthenticationBS.next('Authorized');
          this.stopFaceDetectionLoop();
        }

        if (!authorizedUser && this.authTries === 0) {
          // System is not able to recognize the user and all tries are exhausted.
          this.faceAuthenticationBS.next('Unauthorized');
          this.stopFaceDetectionLoop();
        }
      }
    });
  }

  async loadModels() {
    const platform = Capacitor.getPlatform();
    if (platform === 'web') {
      await loadTinyFaceDetectorModel('./assets/ml-models'),
        await loadFaceLandmarkTinyModel('./assets/ml-models'),
        await loadFaceRecognitionModel('./assets/ml-models')
    } else {
      await loadTinyFaceDetectorModel('/assets/ml');
      await loadFaceLandmarkTinyModel('/assets/ml');
      await loadFaceRecognitionModel('/assets/ml');
    }
  }

  private async detectFace(video: HTMLVideoElement) {
    const faceDetected = await detectSingleFace(video, new TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptor();

    if (!faceDetected) return null;

    this.faceDetectionConfidenceLevel = faceDetected.detection.score * 100;
    this.faceRegistrationBS.next(`Confidence Level: ${this.faceDetectionConfidenceLevel}`)
    if (this.faceDetectionConfidenceLevel > this.REQUIRED_CONFIDENCE_LEVEL) {
      return faceDetected;
    }

    return null;
  }

  private resetAuthTries() {
    this.authTries = this.DEFAULT_AUTH_TRIES;
  }

  private stopFaceDetectionLoop() {
    console.log(`Stopping face detection`);
    this.stopFaceDetection$.next(true);
    this.stopFaceDetection$.complete();
    console.log(`State of face detection replay subject: ${this.stopFaceDetection$.closed}`);
  }

  private initFaceDetectionLoop() {
    console.log('initializing face detection loop interval');
    this.stopFaceDetection$ = new ReplaySubject<boolean>(1);
    this.faceDetectionInterval$ = interval(100).pipe(takeUntil(this.stopFaceDetection$));
  }

}
