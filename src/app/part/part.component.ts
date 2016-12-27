import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Part } from '../part';
import { PartService } from '../part.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent {
    constructor(private router: Router, private partService: PartService) {}

    onEditPart() {
        this.router.navigate(['/edit', this.part.id])
    }

    // TODO: should this logic go in the list view?
    // TODO: if so, remove part service
    // TODO: confirm
    // onDeletePart() {
    //     this.partService.deletePart(this.part.id)
    //     .then(success => {
    //         // TODO: reload part list?
    //     });
    // }

  @Input()
  part: Part;

 @Output() delete: EventEmitter<String> = new EventEmitter();
}
