import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterUserFacePage } from './register-user-face.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterUserFacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterUserFacePageRoutingModule {}
