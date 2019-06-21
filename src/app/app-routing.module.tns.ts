import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { AccelerometerCheckComponent } from './accelerometerCheck/accelerometerCheck.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { DrinkSelectorComponent } from './drink-selector/drink-selector.component';
import { BalanceTestComponent } from './balance-test/balance-test.component';

export const routes: Routes = [
  { path: '', redirectTo: '/start-menu', pathMatch: 'full' },
  { path: 'start-menu', component: StartMenuComponent},
  { path: 'drink-selector', component: DrinkSelectorComponent},
  { path: 'accelerometer-check', component: AccelerometerCheckComponent },
  { path: 'balance-test', component: BalanceTestComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})


export class AppRoutingModule { }
