import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdCardModule } from '@angular2-material/card';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';

import { AppComponent } from './app.component';
import { PartComponent } from './part/part.component';
import { PartEditorComponent } from './part-editor/part-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    PartComponent,
    PartEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
  ],
  providers: [
    MdIconRegistry,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
