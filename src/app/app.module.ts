import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { LOCALE_ID} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

// SERVICIOS
import { WpdataService } from './service/wpdata.service';

import { SwiperModule } from 'angular2-useful-swiper';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SwiperModule
  ],
  providers: [
    {provide:LOCALE_ID, useValue:"es"},
    WpdataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
