import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationSuccessfulPage } from './registration-successful.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationSuccessfulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationSuccessfulPageRoutingModule {}
