import { Patient } from "./patient";

export class Admission {

    //Création des propriétés
    public iep: number;
    public admit: boolean;
    public uf: string;
    public dte_admission: string;
    public ipp: {};
    public dte_cloture: string;
    public patientLinked: Patient;
    public dte: {
        year: number,
        month: number,
        day: number
    };

    formatToWS() {
        if(this.dte_admission != null){
            var dteDebut = new Date(this.dte_admission).toISOString();
        } else {
            var dteDebut = new Date().toISOString();
        }
        if(this.dte_cloture != null && this.dte_cloture != ""){
            var dteClot = new Date(this.dte_cloture).toISOString();
        } else {
            var dteClot = "";
        }
        let objectToReturn = {
            "AAdmit": this.admit,
            "AUf": this.uf,
            "PIpp": this.patientLinked.formatToIntegrationInWebServices(),
            "dteAdmission": dteDebut,
            "dteClotureAdmission": dteClot
        };
        return objectToReturn;
    }

    formatToWSUpdate() {
        if(this.dte_admission != null){
            var dteDebut = new Date(this.dte_admission).toISOString();
        } else {
            var dteDebut = new Date().toISOString();
        }
        if(this.dte_cloture != null && this.dte_cloture != ""){
            var dteClot = new Date(this.dte_cloture).toISOString();
        } else {
            var dteClot = "";
        }
        let objectToReturn = {
            "AAdmit": this.admit,
            "AIep": this.iep,
            "AUf": this.uf,
            "PIpp": this.patientLinked.formatToIntegrationInWebServices(),
            "dteAdmission": dteDebut,
            "dteClotureAdmission": dteClot
        };
        return objectToReturn;
    }

    //Cette fonction permet de créer une admission en recevant le flux de donénes du WS
    fillFromDataWS(flow){
        this.admit = flow.AAdmit;
        let tempDate = new Date(flow.dteAdmission);
        let month = (tempDate.getMonth()+1) < 10 ? "0"+(tempDate.getMonth()+1) : (tempDate.getMonth()+1);
        let day = (tempDate.getDate()) < 10 ? "0"+(tempDate.getDate()) : (tempDate.getDate());
        this.dte_admission = tempDate.getFullYear()+"-"+month+"-"+day;
        this.dte_cloture = flow.dteClotureAdmission != undefined ? flow.dteClotureAdmission : '';
        this.iep = flow.AIep;
        this.patientLinked = new Patient();
        this.patientLinked.fillWithDataFromWS(flow.PIpp); //On le rempli avec des données
        this.uf = flow.AUf;
        this.ipp = this.patientLinked.p_ipp;
    }

    
}
