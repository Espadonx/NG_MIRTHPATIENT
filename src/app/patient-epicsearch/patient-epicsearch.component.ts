import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { Patient } from '../patient';

@Component({
  selector: 'app-patient-epicsearch',
  templateUrl: './patient-epicsearch.component.html',
  styleUrls: ['./patient-epicsearch.component.scss']
})
export class PatientEpicsearchComponent implements OnInit {

  searchData;
  listPatient = [];
  listPatientDisplayed = [];
  msgDisplayed;


  constructor(private _patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.searchData = {
      nom: "",
      prenom: "",
      dateNaissance: ""
    };
    //On charge notre tableau pour pouvoir faire nos tris dessus !
    this._patientService.getPatientList().subscribe(data => {
      var listPatientTemp = [];
      listPatientTemp = data;
      for (var i = 0; i < listPatientTemp.length; i++) {
        var p = new Patient();
        p.fillWithDataFromWS(listPatientTemp[i]);
        this.listPatient.push(p);
      }
      this.listPatientDisplayed = this.listPatient;
    });

    this.msgDisplayed = {
      displayed: false,
      msg: "",
      class: ""
    }
  }

  /**
   * Redirige vers un patient (page détails)
   * @param pat 
   */
  onSelect(pat: Patient){
    this.router.navigate(['patient', pat.p_ipp]);
  }

  /**
   * Fonction de recherche au travers des champs accessibles dans le DOM
   * + Recherche dynamique en fonction des champs
   */
  searchPatient() {

    this.listPatientDisplayed = []; // On vide le tableau
    if (this.searchData.nom != "" || this.searchData.prenom != "" || this.searchData.dateNaissance != "") {
      //Au moins un des champs n'est pas vide, on peut donc rechercher :')
      for (var i = 0; i < this.listPatient.length; i++) {
        //Parcours de tous les patients pour tester les conditions ... ^^
        var okSearch = {
          nom: false,
          prenom: false,
          datenaissance: false
        };
        //Cet objet servira a définir si on l'ajoute à notre nouvelle liste ou non
        if (this.searchData.nom != "") {
          var testValue = this.searchData.nom.toUpperCase();
          var namePatient = this.listPatient[i].p_nom.substring(0, this.searchData.nom.length).toUpperCase()
          if (testValue == namePatient) {
            okSearch.nom = true;
          } else {
            okSearch.nom = false;
          }
        } else {
          okSearch.nom = true; //Si on ne prend rien, on prend toutes les entrées, donc pas de filtre restrictifs
        }

        //Pour le prénom
        if (this.searchData.prenom != "") {
          var testValue = this.searchData.prenom.toUpperCase();
          var namePatient = this.listPatient[i].p_prenoms.prenom1.substring(0, this.searchData.prenom.length).toUpperCase()
          if (testValue == namePatient) {
            okSearch.prenom = true;
          } else {
            okSearch.prenom = false;
          }
        } else {
          okSearch.prenom = true; //Si on ne prend rien, on prend toutes les entrées, donc pas de filtre restrictifs
        }

        if(this.searchData.dateNaissance != ""){
          if(this.searchData.dateNaissance == this.listPatient[i].p_datenaissance){
            okSearch.datenaissance = true;
          } else {
            okSearch.datenaissance = false;
          }
        } else {
          okSearch.datenaissance = true;
        }

        if(okSearch.nom && okSearch.prenom && okSearch.datenaissance){
          this.listPatientDisplayed.push(this.listPatient[i]);
        }

      }

      //On active notre message :')
      this.msgDisplayed.displayed = true;
      this.msgDisplayed.msg = this.listPatientDisplayed.length + " résultats trouvés avec votre recherche dynamique";
      this.msgDisplayed.class = "warning";

    } else {
      //S'ils sont tous non actifs, on affiche toute la liste !
      if(this.searchData.nom == "" && this.searchData.prenom == "" && this.searchData.dateNaissance == ""){
        this.listPatientDisplayed = this.listPatient;
        this.msgDisplayed = {
          displayed: false,
        }
      }
      
    }
  }

}
