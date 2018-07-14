import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Admission } from '../admission';
import { AdmissionService } from '../admission.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-admission-manage',
  templateUrl: './admission-manage.component.html',
  styleUrls: ['./admission-manage.component.css']
})
export class AdmissionManageComponent implements OnInit {

  public admission: Admission;
  public patient: Patient;
  public successUpdating: Boolean = false;

  constructor(private _patientService: PatientService, private _admissionService: AdmissionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.admission = new Admission();
    this.patient = new Patient();
    //On doit récupérer les information sur l'admission. depuis l'ID
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));

      //Maintenant on va chercher les information de notre patient
      this._admissionService.getAdmissionInformation(id)
        .subscribe(data => {
          this.admission.fillFromDataWS(data);
          console.log(data);
          this.patient = this.admission.patientLinked; //On fait le lien !
        });
    });

  }

  //Retourner à la liste des admissions du patient ! :)
  getBackToList(){
    this.router.navigate(["patient-admissions", this.patient.p_ipp]);
  }

  //Fonction de suppression d'une admission
  deleteAdmission(){
    if(confirm("Souhaitez-vous réellement supprimer cette admission ?")){
      //On supprime l'entrée de la base et on redirige en informant l'utilisateur
      this._admissionService.deleteAdmission(this.admission).subscribe();
      alert("Admission supprimée avec succès, vous allez être redirigé");
      this.router.navigate(["patient-admissions", this.patient.p_ipp]);
    }
  }

  saveInformations(values) {
    //On peut tester s'il y à des modifications car
    //si les valeurs sont undefined c'est que le modèle n'a pas été chargé ET DONC pas de modifications sauf uf où
    //on est obligé de tester la correspondance

    var ndp = {
      y: "",
      m: "",
      d: ""
    };

    if (values.dp != undefined) {
      //On a une modification
      if (values.dp.month < 10) {
        ndp.m = "0" + values.dp.month;
      } else {
        ndp.m = values.dp.month + ""; //On caste en string
      };
      if (values.dp.day < 10) {
        ndp.d = "0" + values.dp.day;
      } else {
        ndp.d = values.dp.day + ""; //On caste en string
      };
      ndp.y = values.dp.year;

      //On met  à jour la date d'admission !
      this.admission.dte_admission = ndp.y+"-"+ndp.m+"-"+ndp.d;
    }

    var ndc = {
      y: "",
      m: "",
      d: ""
    };

    if (values.dc != undefined) {
      //On a une modification
      if (values.dc.month < 10) {
        ndc.m = "0" + values.dc.month;
      } else {
        ndc.m = values.dc.month + ""; //On caste en string
      };
      if (values.dc.day < 10) {
        ndc.d = "0" + values.dc.day;
      } else {
        ndc.d = values.dc.day + ""; //On caste en string
      };
      ndc.y = values.dc.year;

      //On met  à jour la date d'admission !
      this.admission.dte_cloture = ndc.y+"-"+ndc.m+"-"+ndc.d;
    }

    if(values.dc == null){
      //ça veut dire que c'est passé à null donc suppression du champs
      this.admission.dte_cloture = null;
    }

    this.admission.uf = values.uf;
    //On met à jour les informations !

    console.log(values);

    this._admissionService.updateAdmissionInformation(this.admission).subscribe(data => {
      console.log("bien mis à jour");
      this.successUpdating = true;
    })

  }

}
