import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationSuccessfulPage } from './registration-successful.page';

describe('RegistrationSuccessfulPage', () => {
  let component: RegistrationSuccessfulPage;
  let fixture: ComponentFixture<RegistrationSuccessfulPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrationSuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
