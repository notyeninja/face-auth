import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginFailedPageRoutingModule } from './login-failed-routing.module';

import { LoginFailedPage } from './login-failed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginFailedPageRoutingModule
  ],
  declarations: [LoginFailedPage]
})
export class LoginFailedPageModule {}
