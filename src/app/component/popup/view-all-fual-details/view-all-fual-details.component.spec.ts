import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFualDetailsComponent } from './view-all-fual-details.component';

describe('ViewAllFualDetailsComponent', () => {
  let component: ViewAllFualDetailsComponent;
  let fixture: ComponentFixture<ViewAllFualDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllFualDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllFualDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
