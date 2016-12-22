import { Injectable } from '@angular/core';
import { Part } from './part';

import { PARTS } from './mock-parts';

@Injectable()
export class PartService {

  constructor() { }

  getParts(): Promise<Part[]> {
      return Promise.resolve(PARTS);
  }

}
