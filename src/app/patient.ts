export class Patient {
    public p_ipp: number;
    public p_nom: string;
    public p_nommatri: string;
    public p_prenoms;
    public p_numcpam: number;
    public p_datenaissance: string;
    public p_adresses;
    public p_tel1: number;
    public p_profession: string;

    constructor(ipp?, nom?, nommatri?, prenom1?, prenom2?, prenom3?, numcpam?, datenaissance?, adr1?, adr2?, cp?, ville?, tel?, profession?) {
        this.p_adresses = {
            ligne1: adr1 != undefined ? adr1 : '',
            ligne2: adr2 != undefined ? adr2 : '',
            cp: cp != undefined ? cp : '',
            ville: ville != undefined ? ville : ''
        }
        this.p_datenaissance = datenaissance != undefined ? datenaissance : '';
        this.p_ipp = ipp;
        this.p_nom = nom != undefined ? nom : '';
        this.p_nommatri = nommatri != undefined ? nommatri : '';
        this.p_numcpam = numcpam != undefined ? numcpam : '';
        this.p_prenoms = {
            prenom1: prenom1 != undefined ? prenom1 : '',
            prenom2: prenom2 != undefined ? prenom2 : '',
            prenom3: prenom3 != undefined ? prenom3 : ''
        };
        this.p_profession = profession;
        this.p_tel1 = tel;
    }

    /**
     * Assigne les bonnes données aux attributs de l'objet depuis
     * des données issues d'un WS.
     * @param obj
     */
    fillWithDataFromWS(obj) {
        this.p_adresses = {
            ligne1: obj.PAdr1 != undefined ? obj.PAdr1 : '',
            ligne2: obj.PAdr2 != undefined ? obj.PAdr2 : '',
            cp: obj.PCp != undefined ? obj.PCp : '',
            ville: obj.PVille != undefined ? obj.PVille : ''
        }
        let tempDate = new Date(obj.PDatenaissance);
        let month = (tempDate.getMonth()+1) < 10 ? "0"+(tempDate.getMonth()+1) : (tempDate.getMonth()+1);
        let day = (tempDate.getDate()) < 10 ? "0"+(tempDate.getDate()) : (tempDate.getDate());
        this.p_datenaissance = tempDate.getFullYear()+"-"+month+"-"+day;
        this.p_ipp = parseInt(obj.PIpp);
        this.p_nom = obj.PNom != undefined ? obj.PNom : '';
        this.p_nommatri = obj.PNommatri != undefined ? obj.PNommatri : '';
        this.p_numcpam = obj.PNumcpam != undefined ? obj.PNumcpam : '';
        this.p_prenoms = {
            prenom1: obj.PPrenom1 != undefined ? obj.PPrenom1 : '',
            prenom2: obj.PPrenom2 != undefined ? obj.PPrenom2 : '',
            prenom3: obj.PPrenom3 != undefined ? obj.PPrenom3 : ''
        };
        this.p_profession = obj.PProfession != undefined ? obj.PProfession : '';
        this.p_tel1 = parseInt(obj.PTel1);
    }

    /**
     * Cette fonction permet d'encapsuler toutes les données dans les bons champs
     * spécifiques et attendus par le WebService JAVA.
     * En effet, il attend des clés spécifiques au format JSON générés automatiquement.
     */
    formatToIntegrationInWebServices(){
        let objectToReturn : Object;

        //Format date naissance au format ISO
        var dteNaiss = new Date(this.p_datenaissance).toISOString();

        objectToReturn = {
            "PAdr1": this.p_adresses.ligne1,
            "PAdr2": this.p_adresses.ligne2,
            "PCp": this.p_adresses.cp,
            "PDatenaissance": dteNaiss,
            "PIpp": this.p_ipp,
            "PNom": this.p_nom,
            "PNommatri": this.p_nommatri,
            "PNumcpam": this.p_numcpam,
            "PPrenom1": this.p_prenoms.prenom1,
            "PPrenom2": this.p_prenoms.prenom2,
            "PPrenom3": this.p_prenoms.prenom3,
            "PProfession": this.p_profession,
            "PTel1": this.p_tel1,
            "PVille": this.p_adresses.ville
        }

        return objectToReturn;
    }


}
