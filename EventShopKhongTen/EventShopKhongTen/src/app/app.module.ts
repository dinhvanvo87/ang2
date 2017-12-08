import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './appRouting';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
