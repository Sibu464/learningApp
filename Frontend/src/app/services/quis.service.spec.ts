import { TestBed } from '@angular/core/testing';

import { QuisService } from './quis.service';

describe('QuisService', () => {
  let service: QuisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
