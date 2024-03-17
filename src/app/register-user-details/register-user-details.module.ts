import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterUserDetailsPageRoutingModule } from './register-user-details-routing.module';

import { RegisterUserDetailsPage } from './register-user-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUserDetailsPageRoutingModule
  ],
  declarations: [RegisterUserDetailsPage]
})
export class RegisterUserDetailsPageModule {}
