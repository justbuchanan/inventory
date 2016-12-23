import { Component, Input } from '@angular/core';
import { Part } from '../part';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent {
    constructor(private router: Router) {}

    onEditPart() {
        this.router.navigate(['/edit', this.part.id])
    }

  @Input()
  part: Part;
}
