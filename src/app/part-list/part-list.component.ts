import { Component, OnInit, EventEmitter } from '@angular/core';
import { Part } from '../part';
import { PartService } from '../part.service';
import { Router } from '@angular/router';
import { FuzzyPipe } from 'ng-pipes';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css'],
  providers: [FuzzyPipe],
})
export class PartListComponent implements OnInit {

  constructor(
      private router: Router,
      private partService: PartService,
      private fuzzy: FuzzyPipe, // fuzzy search filter tied to search field
      ) { }

  ngOnInit() {
      this.partService.getParts().then(parts => {
        this.parts = parts;
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

  query: string;

  parts: Part[] = [];
}
