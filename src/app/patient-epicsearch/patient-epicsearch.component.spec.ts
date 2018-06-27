import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEpicsearchComponent } from './patient-epicsearch.component';

describe('PatientEpicsearchComponent', () => {
  let component: PatientEpicsearchComponent;
  let fixture: ComponentFixture<PatientEpicsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEpicsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEpicsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
