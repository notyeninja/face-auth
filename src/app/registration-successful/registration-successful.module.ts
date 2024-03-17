import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationSuccessfulPageRoutingModule } from './registration-successful-routing.module';

import { RegistrationSuccessfulPage } from './registration-successful.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationSuccessfulPageRoutingModule
  ],
  declarations: [RegistrationSuccessfulPage]
})
export class RegistrationSuccessfulPageModule {}
