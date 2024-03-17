import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterUserFacePageRoutingModule } from './register-user-face-routing.module';

import { RegisterUserFacePage } from './register-user-face.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUserFacePageRoutingModule
  ],
  declarations: [RegisterUserFacePage]
})
export class RegisterUserFacePageModule {}
