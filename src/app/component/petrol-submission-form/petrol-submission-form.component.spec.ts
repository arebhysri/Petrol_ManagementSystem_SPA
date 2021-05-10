import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolSubmissionFormComponent } from './petrol-submission-form.component';

describe('PetrolSubmissionFormComponent', () => {
  let component: PetrolSubmissionFormComponent;
  let fixture: ComponentFixture<PetrolSubmissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetrolSubmissionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolSubmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
