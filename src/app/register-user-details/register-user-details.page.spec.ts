import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterUserDetailsPage } from './register-user-details.page';

describe('RegisterUserDetailsPage', () => {
  let component: RegisterUserDetailsPage;
  let fixture: ComponentFixture<RegisterUserDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterUserDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
