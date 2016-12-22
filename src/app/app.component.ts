import { Component } from '@angular/core';
import { Part } from './part';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  parts: Part[] = [
      {
          id: "abcd",
          brief: "M3 screws",
          description: "",
          quantity: 100,
      },
      {
          id: "1234",
          brief: "Red Leds",
          description: "",
          quantity: 15,
      }
  ]

}
