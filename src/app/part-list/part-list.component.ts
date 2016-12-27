import { Component, OnInit, EventEmitter } from '@angular/core';
import { Part } from '../part';
import { PartService } from '../part.service';
import { Router } from '@angular/router';
import { Fuse } from 'fuse.js';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {

  constructor(
      private router: Router,
      private partService: PartService,
      ) { }

  ngOnInit() {
      this.partService.getParts().then(parts => {
        this.parts = parts;
        this.fuse = new Fuse(this.parts, {keys: ['id', 'brief', 'description']});
      })
  }

  deletePart(partId: string) {
    console.log(partId);

    // remove part from local store
    this.partService.deletePart(partId).then(success => {
      for (var i = 0; i < this.parts.length; i++) {
        if (this.parts[i].id == partId) {
          this.parts.splice(i, 1);
          console.log('deleted index ' + i)
          break;
        }
      }
    })
  }

  onQueryChange() {
    // if (this.query.length > 0) {
    //   this.filtered_parts = this.fuse.search(query);
    // } else {
    //   this.filtered_parts = this.parts;
    // }
  }

  query: string;
  filtered_parts: Part[];

  fuse: Fuse;
  parts: Part[];
}
