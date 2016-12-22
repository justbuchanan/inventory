import { Component } from '@angular/core';
import { Part } from './part';
import { PARTS } from './mock-parts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shop Inventory';
  parts: Part[] = PARTS;
}
