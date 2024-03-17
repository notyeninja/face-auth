import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterUserFacePage } from './register-user-face.page';

describe('RegisterUserFacePage', () => {
  let component: RegisterUserFacePage;
  let fixture: ComponentFixture<RegisterUserFacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterUserFacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
