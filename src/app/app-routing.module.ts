import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccelerometerCheckComponent } from './accelerometerCheck/accelerometerCheck.component';

const routes: Routes = [
  { path: '', component: AccelerometerCheckComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
