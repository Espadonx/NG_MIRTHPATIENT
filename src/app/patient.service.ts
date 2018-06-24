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
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Fonction qui récupère la liste des patients contenus dans la DB
   */
  getPatientList(): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.url_ws+"ws_admissions.patients/", this.httpOptions);
  }

  /**
   * Récupère les information d'un patient en particulier
   * @param id 
   */
  getPatientInformation(id): Observable<Patient>{
    return this.http.get<Patient>(this.url_ws+"ws_admissions.patients/"+id, this.httpOptions);
  }

}
