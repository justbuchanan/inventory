import { Component, OnInit, Input } from '@angular/core';
import { Part } from '../part';
import { PartService } from '../part.service';

@Component({
  selector: 'app-part-editor',
  templateUrl: './part-editor.component.html',
  styleUrls: ['./part-editor.component.css']
})
export class PartEditorComponent implements OnInit {

  constructor(private partService: PartService) { }

  ngOnInit() {
  }

  onSubmit() {
      console.log('submit')
      this.partService.createPart(this.part).then(part => {
          console.log("created part!" + JSON.stringify(part))
      });
  }

  @Input()
  part: Part;

  @Input()
  isNewPart: boolean;
}
