import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PumberManagementComponent } from './pumber-management.component';

describe('PumberManagementComponent', () => {
  let component: PumberManagementComponent;
  let fixture: ComponentFixture<PumberManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PumberManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PumberManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
