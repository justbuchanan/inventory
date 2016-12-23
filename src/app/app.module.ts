import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdCardModule } from '@angular2-material/card';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';

import { AppComponent } from './app.component';
import { PartComponent } from './part/part.component';
import { PartEditorComponent } from './part-editor/part-editor.component';
import { PartListComponent } from './part-list/part-list.component';
import { PartService } from './part.service';

const appRoutes: Routes = [
  { path: 'create', component: PartEditorComponent },
  { path: 'edit/:id', component: PartEditorComponent },
  { path: '', component: PartListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PartComponent,
    PartEditorComponent,
    PartListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdCardModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    MdIconRegistry,
    PartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
