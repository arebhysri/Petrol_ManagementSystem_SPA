import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePumperComponent } from './create-pumper.component';

describe('CreatePumperComponent', () => {
  let component: CreatePumperComponent;
  let fixture: ComponentFixture<CreatePumperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePumperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePumperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
