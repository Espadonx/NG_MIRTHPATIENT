import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Patient } from '../patient';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

  public iPP;
  public patient: Patient;

  constructor(private _patientService:PatientService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    //this.iPP = id;
    this.patient = new Patient();

    this.route.paramMap.subscribe ((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.iPP = id;

      //Maintenant on va chercher les information de notre patient
      this._patientService.getPatientInformation(this.iPP)
      .subscribe(data => this.assignData(data));
    }) ;
  }

  public getBackToList(){
    this.router.navigate(['patientList']);
  }

  public assignData(data){
    this.patient.fillWithDataFromWS(data);
  }

}
