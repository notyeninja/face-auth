import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginSuccessPageRoutingModule } from './login-success-routing.module';

import { LoginSuccessPage } from './login-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginSuccessPageRoutingModule
  ],
  declarations: [LoginSuccessPage]
})
export class LoginSuccessPageModule {}
