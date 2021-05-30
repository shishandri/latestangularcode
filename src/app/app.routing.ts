import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './guards/auth.guard'; 
const routes: Routes =[
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
},

{
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
},
{
  path: '', redirectTo: '/login', pathMatch: 'full'
},
// {
//   path: 'addclient', component: UpgradeComponent
// },
  {
    path: '',
    redirectTo: 'dashboard',canActivate : [AuthGuard],
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,canActivate : [AuthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',canActivate : [AuthGuard]
    }]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
