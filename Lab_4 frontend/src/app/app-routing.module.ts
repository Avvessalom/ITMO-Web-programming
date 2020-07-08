import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {GeyPageComponent} from "./gey/gey-page.component";
import {EugenePageComponent} from "./eugene/eugene-page.component";
import {LabaPageComponent} from './laba/laba-page.component';
import {VarPageComponent} from "./var-page/var-page.component";
const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent},
      {path: 'laba', component: LabaPageComponent},
      {path: 'var', component: VarPageComponent},
      {path: 'gey', component: GeyPageComponent},
      {path: 'eugene', component: EugenePageComponent},
    ]
  },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
