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
    // this.addPartClicked(null); // TODO: rm
  }

  getParts(): void {
    this.partService.getParts().then(parts => this.parts = parts);
  }

  addPartClicked(event) {
    this.editingPart = {
        id: "1234",
        brief: "Red Leds",
        description: "desc todo",
        quantity: 15,
    }
    this.creatingNewPart = true;
  }

  title = 'Shop Inventory';
  parts: Part[];

  editingPart: Part;
  creatingNewPart: boolean;
}
