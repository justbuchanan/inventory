import { Component, OnInit } from '@angular/core';
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

  parts: Part[];
}
