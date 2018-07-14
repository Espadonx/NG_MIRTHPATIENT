import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { Patient } from '../patient';
import { Admission } from '../admission';
import { AdmissionService } from '../admission.service';

@Component({
  selector: 'app-admission-create',
  templateUrl: './admission-create.component.html',
  styleUrls: ['./admission-create.component.css']
})
export class AdmissionCreateComponent implements OnInit {

  currentPatientIpp: number = null;
  currentPatient: Patient = null;
  listPatient = [];
  successCreation: boolean = null;
  errors: boolean = null;
  errorsList = [];

  currentAdmission: Admission = null;

  constructor(private _patientService: PatientService, private _admissionService: AdmissionService, private router: Router) { }

  ngOnInit() {
    this.currentPatient = new Patient();
    this.currentAdmission = new Admission();

    this._patientService.getPatientList().subscribe(data => {
      var listPatientTemp = [];
      listPatientTemp = data;
      for (var i = 0; i < listPatientTemp.length; i++) {
        var p = new Patient();
        p.fillWithDataFromWS(listPatientTemp[i]);
        this.listPatient.push(p);
      }
    });
  }

  //On affiche les informations nécessaires à la création d'une admission
  selectPatient(){
    if(this.currentPatientIpp != null){
      this._patientService.getPatientInformation(this.currentPatientIpp).subscribe(data => {
        this.currentPatient.fillWithDataFromWS(data);
        this.currentAdmission.ipp = this.currentPatient.p_ipp;
        this.currentAdmission.patientLinked = this.currentPatient;
      })
    }
  }

  saveAdmission(){
    this.errorsList = [];
    console.log(this.currentAdmission);
    //Il faut reformater la date que lo'on récupère du composant bootstrap!
    if("dte" in this.currentAdmission){} else { this.errorsList.push("La date ne peut être vide.") } //Ajout au tableau des erreurs
    if("uf" in this.currentAdmission){} else { this.errorsList.push("L'UF d'entrée doit être renseignée.") } //Ajout au tableau des erreurs
    if(this.errorsList.length == 0){
      var d = {
        y: "",
        m: "",
        d: ""
      };
      if(this.currentAdmission.dte.month < 10){
        d.m = "0"+this.currentAdmission.dte.month;
      } else {
        d.m = this.currentAdmission.dte.month+""; //On caste en string
      };
      if(this.currentAdmission.dte.day < 10){
        d.d = "0"+this.currentAdmission.dte.day;
      } else {
        d.d = this.currentAdmission.dte.day+""; //On caste en string
      };
  
      this.currentAdmission.dte_admission = d.y+"-"+d.m+"-"+d.d;
      this.currentAdmission.admit = false;
      this._admissionService.createAdmission(this.currentAdmission).subscribe(data => {
        this.successCreation = true;
      })

    } else {
      this.errors = true;
    }
    
  }
  

}
