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
  public successMessage: String;

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

  /**
   * Récupération de l'action évènementielle du formulaire "Sauvegarde"
   */
  public saveInformations(value){
    //On va donc se servir de notre service web pour modifier notre entrée dans la base
    this._patientService.updatePatientInformation(this.patient).subscribe(data => this.updateMessage());
  }

  /**
   * Fonction de success des infos qui ont été push sur le serveur
   */
  public updateMessage(){
    var dte = new Date();
    var dteTxt = dte.getHours()+":"+dte.getMinutes()+":"+dte.getSeconds();
    this.successMessage = "Les modifications ont bien été prises en compte. ("+dteTxt+")";
  }

}
