import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPatient } from './patient_interface';
import { Patient } from './patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public url_ws = "http://localhost:39764/ProjetInteropIsis/webresources/";

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Fonction qui récupère la liste des patients contenus dans la DB
   */
  getPatientList(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url_ws + "ws_admissions.patients/", this.httpOptions);
  }

  /**
   * Récupère les information d'un patient en particulier
   * @param id 
   */
  getPatientInformation(id): Observable<Patient> {
    return this.http.get<Patient>(this.url_ws + "ws_admissions.patients/" + id, this.httpOptions);
  }

  /**
   * Gestion de modification de ressource
   * @param pat 
   */
  updatePatientInformation(pat: Patient): Observable<Patient> {
    let ressource = this.url_ws + "ws_admissions.patients/" + pat.p_ipp;
    return this.http.put<Patient>(ressource, pat.formatToIntegrationInWebServices(), this.httpOptions);
  }

  /**
   * Fonction qui permet de checker s'il y à des doublons ou non
   * @param patientList 
   * @param actualPatient 
   */
  checkDoublon(patientList, actualPatient: Patient): Patient[] {
    var rtrn = [];
    for(var i=0; i<patientList.length; i++){
       var pList = new Patient();
       pList.fillWithDataFromWS(patientList[i]);
      if(pList.p_nom == actualPatient.p_nom){
        rtrn.push(pList);
      }
    }
    return rtrn;
  }

  /**
   * Fonction de création d'un patient en base de données
   * @param patient 
   */
  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.url_ws + "ws_admissions.patients/", patient.formatToIntegrationInWebServices(), this.httpOptions);
  }

  deletePatient(patient: Patient): Observable<{}>{
    return this.http.delete(this.url_ws + "ws_admissions.patients/" + patient.p_ipp, this.httpOptions);
  }

}
