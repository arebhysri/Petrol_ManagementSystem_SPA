import { TestBed } from '@angular/core/testing';

import { PumpSectionService } from './pump-section.service';

describe('PumpSectionService', () => {
  let service: PumpSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PumpSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
