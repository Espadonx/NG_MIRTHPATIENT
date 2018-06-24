import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionManageComponent } from './admission-manage.component';

describe('AdmissionManageComponent', () => {
  let component: AdmissionManageComponent;
  let fixture: ComponentFixture<AdmissionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
