import { Injectable } from '@angular/core';
import { FaceDetection, FaceMatcher, TinyFaceDetectorOptions, detectSingleFace, loadFaceLandmarkTinyModel, loadFaceRecognitionModel, loadTinyFaceDetectorModel } from 'face-api.js';
import { BehaviorSubject, ReplaySubject, interval, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceAuthService {

  private stopFaceDetection$ = new ReplaySubject<boolean>(1);
  private faceDetectionInterval$ = interval(100).pipe(takeUntil(this.stopFaceDetection$));
  private registerFaceDescriptor: Float32Array[] = [];
  private readonly REQUIRED_CONFIDENCE_LEVEL = 95;
  private faceRegistrationBS = new BehaviorSubject<string>('');
  private faceAuthenticationBS = new BehaviorSubject<string>('');
  private faceDetectionConfidenceLevel = 0;
  private readonly DEFAULT_AUTH_TRIES = 3;
  private authTries = 0;
  private userName = '';

  faceRegistrationStatus$ = this.faceRegistrationBS.asObservable();
  faceAuthenticationStatus$ = this.faceAuthenticationBS.asObservable();

  constructor() { }

  setUserDetails(userName: string) {
    this.userName = userName;
  }

  registerFace(video: HTMLVideoElement) {
    this.resetFaceDetectionLoop();
    this.faceRegistrationBS.next('Started face registration...');
    // start detecting face at an interval
    // stop when high quality face is detected.
    this.faceDetectionInterval$.subscribe(async () => {
      const detectedFace = await this.detectFace(video);
      if (detectedFace) {
        this.registerFaceDescriptor.push(detectedFace.descriptor);
        this.stopFaceDetectionLoop();
        this.faceRegistrationBS.next('Successfully registered face. Redirecting user...');
      }
    });
  }

  authenticateUser(video: HTMLVideoElement) {
    if (this.registerFaceDescriptor.length == 0) {
      this.faceAuthenticationBS.next('No user is registered. Please register an user');
      return;
    }

    this.resetAuthTries();
    this.resetFaceDetectionLoop();
    // get the reference face to match.
    const faceMatcher = new FaceMatcher(this.registerFaceDescriptor);
    this.faceDetectionInterval$.subscribe(async () => {
      const detectedFace = await this.detectFace(video);
      if (detectedFace) {
        const bestMatch = faceMatcher.findBestMatch(detectedFace.descriptor);
        this.authTries -= 1;
        const notAuthorized = (bestMatch.label === 'unknown' || bestMatch.distance > 0.6);

        if (!notAuthorized) {
          // if system detect is authorized face then mark it successfull
          this.faceAuthenticationBS.next('Authorized');
          this.stopFaceDetectionLoop();
        }

        if (notAuthorized && this.authTries === 0) {
          // System is not able to recognize the user and all tries are exhausted.
          this.faceAuthenticationBS.next('Not Authorized');
          this.stopFaceDetectionLoop();
        }
      }
    });
  }

  async loadModels() {
    return Promise.all([
      loadTinyFaceDetectorModel('./assets/ml-models'),
      loadFaceLandmarkTinyModel('./assets/ml-models'),
      loadFaceRecognitionModel('./assets/ml-models')
    ]).then(() => { });
  }

  private async detectFace(video: HTMLVideoElement) {
    const faceDetected = await detectSingleFace(video, new TinyFaceDetectorOptions())
      .withFaceLandmarks(true)
      .withFaceDescriptor();

    if (!faceDetected) return null;

    this.faceDetectionConfidenceLevel = faceDetected.detection.score * 100;
    this.faceRegistrationBS.next(`Confidence Level: ${this.faceDetectionConfidenceLevel}`)
    if (this.faceDetectionConfidenceLevel > 95) {
      return faceDetected;
    }

    return null;
  }

  private resetAuthTries() {
    this.authTries = this.DEFAULT_AUTH_TRIES;
  }

  private stopFaceDetectionLoop() {
    this.stopFaceDetection$.next(true);
    this.stopFaceDetection$.complete();
  }

  private resetFaceDetectionLoop() {
    this.stopFaceDetection$ = new ReplaySubject<boolean>(1);
  }
}
