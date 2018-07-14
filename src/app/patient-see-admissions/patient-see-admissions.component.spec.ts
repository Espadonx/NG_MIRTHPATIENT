import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSeeAdmissionsComponent } from './patient-see-admissions.component';

describe('PatientSeeAdmissionsComponent', () => {
  let component: PatientSeeAdmissionsComponent;
  let fixture: ComponentFixture<PatientSeeAdmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSeeAdmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSeeAdmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
