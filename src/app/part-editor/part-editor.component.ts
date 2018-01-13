import { Component, OnInit, Input } from "@angular/core";
import { Part } from "../part";
import { PartService } from "../part.service";

import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-part-editor",
  templateUrl: "./part-editor.component.html",
  styleUrls: ["./part-editor.component.css"]
})
export class PartEditorComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService
  ) {}

  ngOnInit() {
    // TODO: is there a better way to handle edit vs create?

    const url: Observable<string> = this.route.url.map(segments =>
      segments.join("")
    );
    url.subscribe(
      value => (this.isNewPart = value == "create"),
      error => console.log(error),
      () => console.log("finished")
    );

    this.route.params
      .switchMap((params: Params) => {
        if (params["id"] != null) {
          return this.partService.getPart(params["id"]);
        } else {
          return new Promise<Part>(function(resolve, reject) {
            resolve(new Part());
          });
        }
      })
      .subscribe((part: Part) => (this.part = part));
  }

  // TODO: error handling
  onSubmit() {
    if (this.isNewPart) {
      console.log("submit");
      this.partService.createPart(this.part).then(part => {
        console.log("created part!" + JSON.stringify(part));
        // back to home screen
        this.router.navigate(["/"]);
      });
    } else {
      // TODO: update part
    }
  }

  onCancel() {
    this.router.navigate(["/"]);
  }

  @Input() part: Part;

  isNewPart: boolean;
}
