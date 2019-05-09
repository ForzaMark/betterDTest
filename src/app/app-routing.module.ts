import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { accelerometerCheckComponent } from './accelerometerCheck/accelerometerCheck.component';

const routes: Routes = [
  { path:'', component: accelerometerCheckComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
