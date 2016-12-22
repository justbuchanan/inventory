import { Component, Input } from '@angular/core';
import { Part } from '../part';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent {
  @Input()
  part: Part;
}
