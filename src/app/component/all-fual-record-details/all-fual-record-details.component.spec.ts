import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFualRecordDetailsComponent } from './all-fual-record-details.component';

describe('AllFualRecordDetailsComponent', () => {
  let component: AllFualRecordDetailsComponent;
  let fixture: ComponentFixture<AllFualRecordDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFualRecordDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFualRecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
