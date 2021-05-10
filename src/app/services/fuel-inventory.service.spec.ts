import { TestBed } from '@angular/core/testing';

import { FuelInventoryService } from './fuel-inventory.service';

describe('FuelInventoryService', () => {
  let service: FuelInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
