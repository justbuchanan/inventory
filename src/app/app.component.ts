import { Component, OnInit } from '@angular/core';
import { Part } from './part';
import { PartService } from './part.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PartService],
})
export class AppComponent implements OnInit {
  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.getParts();
  }

  getParts(): void {
    this.parts = this.partService.getParts();
  }

  title = 'Shop Inventory';
  parts: Part[];
}
