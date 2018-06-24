import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  public listPatient = [];
  public error;
    
  constructor(private _patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this._patientService.getPatientList()
    .subscribe(data => this.listPatient = data);
  }

  public getListPatient(){
    return this.listPatient;
  }

  public onSelect(patient){
    this.router.navigate(['/patient', patient.PIpp])
      //Ordre des paramètres : 
        // 1. L'URL, paramètre
  }

}
