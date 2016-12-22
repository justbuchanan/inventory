import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdCardModule } from '@angular2-material/card';

import { AppComponent } from './app.component';
import { PartComponent } from './part/part.component';

@NgModule({
  declarations: [
    AppComponent,
    PartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
