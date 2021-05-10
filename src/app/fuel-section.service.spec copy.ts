import { TestBed } from '@angular/core/testing';

import { FuelSectionService } from './fuel-section.service';

describe('FuelSectionService', () => {
  let service: FuelSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
