import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ROUTER_COMPONENTS, AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent, ...ROUTER_COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
