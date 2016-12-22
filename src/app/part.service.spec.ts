/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartService } from './part.service';

describe('PartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartService]
    });
  });

  it('should ...', inject([PartService], (service: PartService) => {
    expect(service).toBeTruthy();
  }));
});
