import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { accelerometerCheckComponent } from './accelerometerCheck/accelerometerCheck.component';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    accelerometerCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
