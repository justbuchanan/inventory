import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NgPipesModule } from "ng-pipes";

import { AppComponent } from "./app.component";
import { PartComponent } from "./part/part.component";
import { PartEditorComponent } from "./part-editor/part-editor.component";
import { PartListComponent } from "./part-list/part-list.component";
import { PartService } from "./part.service";

const appRoutes: Routes = [
  { path: "create", component: PartEditorComponent },
  { path: "edit/:id", component: PartEditorComponent },
  { path: "", component: PartListComponent }
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
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
    NgPipesModule
  ],
  providers: [MatIconRegistry, PartService],
  bootstrap: [AppComponent]
})
export class AppModule {}
