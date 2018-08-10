import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TypeaheadModule, ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeService, AuthService } from './service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdg2tvUCx6o4JuDw61GbeLzB10lf0CI-E'
    }),
    NgxPaginationModule
  ],
  providers: [
    HomeService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
