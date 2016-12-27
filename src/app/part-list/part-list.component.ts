import { Component, OnInit, EventEmitter } from '@angular/core';
import { Part } from '../part';
import { PartService } from '../part.service';
import { Router } from '@angular/router';

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
      this.partService.getParts().then(parts => this.parts = parts)
  }

  // deletePart(string: partId) {
  deletePart($event) {
    // partId: string;
    var partId = event.target.value;
    this.partService.deletePart(partId).then(success => {
      for (var i = 0; i < this.parts.length; i++) {
        // if (this.parts[i].id == partId) {
          // this.parts.remove(i);
          console.log('deleted index ' + i)
        // } 
      }
    })
  }

  parts: Part[];
}
