import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './patient';
import { Admission } from './admission';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  public url_ws = "http://localhost:39764/ProjetInteropIsis/webresources/";

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Fonction de création d'une admission en base de données
   * @param admission 
   */
  createAdmission(admission: Admission): Observable<Admission> {
    return this.http.post<Admission>(this.url_ws + "ws_admissions.admissions/", admission.formatToWS(), this.httpOptions);
  }

  /**
   * Fonction qui récupère la liste des admissions contenus dans la DB
   */
  getAdmissionList(): Observable<Admission[]> {
    return this.http.get<Admission[]>(this.url_ws + "ws_admissions.admissions/", this.httpOptions);
  }

  /**
   * Récupère les information d'un Admission en particulier
   * @param id 
   */
  getAdmissionInformation(id): Observable<Admission> {
    return this.http.get<Admission>(this.url_ws + "ws_admissions.admissions/" + id, this.httpOptions);
  }

  /**
   * Gestion de modification de ressource
   * @param adm
   */
  updateAdmissionInformation(adm: Admission): Observable<Admission> {
    let ressource = this.url_ws + "ws_admissions.admissions/" + adm.iep;
    return this.http.put<Admission>(ressource, adm.formatToWSUpdate(), this.httpOptions);
  }

  /**
   * Supprimer l'admission avec l'id IEP
   * @param adm 
   */
  deleteAdmission(adm: Admission): Observable<{}>{
    return this.http.delete(this.url_ws + "ws_admissions.admissions/" + adm.iep, this.httpOptions);
  }

}
