import { Component, OnInit } from '@angular/core';
import { Part } from './part';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  addPartClicked(event) {
    this.router.navigate(['/create'])
  }

  title = 'Shop Inventory';
  parts: Part[];
}
