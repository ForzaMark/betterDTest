import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccelerometerCheckComponent } from './accelerometerCheck/accelerometerCheck.component';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { DrinkSelectorComponent } from './drink-selector/drink-selector.component';

const routes: Routes = [
  { path: '', redirectTo: '/start-menu', pathMatch: 'full' },
  { path: 'start-menu', component: StartMenuComponent},
  { path: 'drink-selector', component: DrinkSelectorComponent},
  { path: 'accelerometer-check', component: AccelerometerCheckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
