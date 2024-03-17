import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginSuccessPage } from './login-success.page';

describe('LoginSuccessPage', () => {
  let component: LoginSuccessPage;
  let fixture: ComponentFixture<LoginSuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
