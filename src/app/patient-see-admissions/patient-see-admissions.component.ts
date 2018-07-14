import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AdmissionService } from '../admission.service';
import { Admission } from '../admission';

@Component({
  selector: 'app-patient-see-admissions',
  templateUrl: './patient-see-admissions.component.html',
  styleUrls: ['./patient-see-admissions.component.scss']
})
export class PatientSeeAdmissionsComponent implements OnInit {

  public iPP;
  public patient: Patient;
  public successMessage: String;

  //variables propres aux admissions
  public admissionsList: Admission[];

  constructor(private _patientService:PatientService, private _admissionService: AdmissionService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.admissionsList = [];
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    //this.iPP = id;
    this.patient = new Patient();

    this.route.paramMap.subscribe ((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.iPP = id;

      //Maintenant on va chercher les information de notre patient
      this._patientService.getPatientInformation(this.iPP)
      .subscribe(data => this.assignData(data));

      //Récupération des admissions propres à notre patient
      this._admissionService.getAdmissionList().subscribe(data2 => {
        //On doit tester toutes les données que l'on a reçue.
        for(var i=0; i<data2.length; i++){
          //On doit créer chaque admission par rapport au flux de données que l'on reçoit.
          var Adm = new Admission();
          Adm.fillFromDataWS(data2[i]);
          //Si l'admission concerne notre patient, on la garde
          if(Adm.ipp == this.patient.p_ipp){
            console.log(data2[i]);
            this.admissionsList.push(Adm);
          }
        }
      })
    });
  }

  public getBackToList(){
    this.router.navigate(['patientList']);
  }

  public manageAdmission(adm: Admission){
    this.router.navigate(['admission', adm.iep]);
  }

  public goToFiche(){
    this.router.navigate(['patient', this.patient.p_ipp]);
  }

  public deletePatient(){
    if(confirm("Souhaitez-vous réellement supprimer cette fiche ?")){
      //On supprime l'entrée de la base et on redirige en informant l'utilisateur
      this._patientService.deletePatient(this.patient).subscribe();
      alert("Patient supprimé avec succès, vous allez être redirigé");
      this.router.navigate(["patientList"]);
    }
  }

  public assignData(data){
    this.patient.fillWithDataFromWS(data);
  }
}
