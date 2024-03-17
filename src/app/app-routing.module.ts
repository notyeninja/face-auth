import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register-user-details',
    loadChildren: () => import('./register-user-details/register-user-details.module').then( m => m.RegisterUserDetailsPageModule)
  },
  {
    path: 'register-user-face',
    loadChildren: () => import('./register-user-face/register-user-face.module').then( m => m.RegisterUserFacePageModule)
  },
  {
    path: 'registration-successful',
    loadChildren: () => import('./registration-successful/registration-successful.module').then( m => m.RegistrationSuccessfulPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-success',
    loadChildren: () => import('./login-success/login-success.module').then( m => m.LoginSuccessPageModule)
  },
  {
    path: 'login-failed',
    loadChildren: () => import('./login-failed/login-failed.module').then( m => m.LoginFailedPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
