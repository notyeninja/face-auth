import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginSuccessPage } from './login-success.page';

const routes: Routes = [
  {
    path: '',
    component: LoginSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginSuccessPageRoutingModule {}
