import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFailedPage } from './login-failed.page';

describe('LoginFailedPage', () => {
  let component: LoginFailedPage;
  let fixture: ComponentFixture<LoginFailedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginFailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
