import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { AccelerometerCheckComponent } from './accelerometerCheck/accelerometerCheck.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auto-generated', pathMatch: 'full' },
  { path: 'auto-generated', component: AccelerometerCheckComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})


export class AppRoutingModule { }
