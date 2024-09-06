/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TypeWriterServiceService } from './TypeWriterService.service';

describe('Service: TypeWriterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeWriterServiceService]
    });
  });

  it('should ...', inject([TypeWriterServiceService], (service: TypeWriterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
