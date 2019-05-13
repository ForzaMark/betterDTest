import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccelerometerCheckComponent } from './accelerometerCheck/accelerometerCheck.component';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { DrinkSelectorComponent } from './drink-selector/drink-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    AccelerometerCheckComponent,
    StartMenuComponent,
    DrinkSelectorComponent
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
