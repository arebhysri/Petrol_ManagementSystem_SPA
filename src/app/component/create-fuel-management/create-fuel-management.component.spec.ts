import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFuelManagementComponent } from './create-fuel-management.component';

describe('CreateFuelManagementComponent', () => {
  let component: CreateFuelManagementComponent;
  let fixture: ComponentFixture<CreateFuelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFuelManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFuelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
