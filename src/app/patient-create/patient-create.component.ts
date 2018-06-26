import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent implements OnInit {

  public patient: Patient;
  public doublons: Boolean;
  public errors: Boolean;
  public successCreation: boolean;
  public doublonsList: Patient[];
  public errorsList = [];

  constructor(private _patientService: PatientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.patient = new Patient();
    this.doublons = false;
    this.errors = false;
    this.successCreation = false;
    this.doublonsList = [];
    this.errorsList = [];
  }

  /**
   * Fonction de création d'un patient + prise en charge recherche doublon
   * @param value 
   */
  createPatient(value) {
    //Recherche des doublons
    let callWs = this._patientService.getPatientList().subscribe((data: Patient[]) => {
      //On recherche les erreurs s'il y en à !
      this.errorsList = [];
      this.errorsList = this.checkIfPropertyIsMissing();
      if (this.errorsList.length > 0) {
        this.errors = true;
      } else {
        this.errors = false;
      }

      this.doublonsList = this._patientService.checkDoublon(data, this.patient); //On remplit ou non notre tableau à afficher ou non :P
      if (this.doublonsList.length > 0) {
        this.doublons = true; //On affiche le tableau
      } else {
        this.doublons = false;
        //On vérifie s'il n'y a pas d'erreur, on insère notre patient
        if (this.errors == false) {
          this._patientService.createPatient(this.patient).subscribe(data => {
            //On affiche le message de succès ? :)
            this.successCreation = true;
          });
        }
      }

    });
  }

  /**
   * Fonction qui force le tableau des doublons pour insérer une entrée avec un nom similaire
   */
  confirmPatientCreation() {
    this.errorsList = [];
    this.errorsList = this.checkIfPropertyIsMissing();
    if (this.errorsList.length > 0) {
      this.errors = true;
    } else {
      this.errors = false;
    }
    if (this.errors == false) {
      this._patientService.createPatient(this.patient).subscribe(data => {
        //On affiche le message de succès ? :)
        this.successCreation = true;
      });
    }
  }

  public getBackToList(){
    this.router.navigate(['patientList']);
  }

  /**
   * Fonction qui vérifie que toutes les informations sont remplies !
   */
  checkIfPropertyIsMissing() {
    var errors = [];
    console.log(this.patient);
    (this.patient.p_nom == "" ? errors.push("Le nom ne peut être vide") : null);
    (this.patient.p_prenoms.prenom1 == "" ? errors.push("Le prénom ne peut être vide") : null);
    (this.patient.p_numcpam == 0 ? errors.push("Le numéro CPAM ne peut être vide !") : null);
    (this.patient.p_datenaissance == "" ? errors.push("La date de naissance ne peut être vide !") : null);
    (this.patient.p_adresses.ligne1 == "" ? errors.push("L'adresse ne peut être vide !") : null);
    (this.patient.p_adresses.cp == "" ? errors.push("Le CP ne peut être vide !") : null);
    (this.patient.p_adresses.ville == "" ? errors.push("La ville ne peut être vide !") : null);

    return errors;
  }

  /**
   * En cas de doublon, cette fonction redirige vers la bonne fiche
   * @param idp 
   */
  seeFiche(pat: Patient) {
    this.router.navigate(['/patient', pat.p_ipp]);
  }

}
