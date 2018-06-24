export class Patient {
    public p_ipp: number;
    public p_nom: string;
    public p_nommatri: string;
    public p_prenoms: Object;
    public p_numcpam: number;
    public p_datenaissance: Date;
    public p_adresses: object;
    public p_tel1: number;
    public p_profession: string;
    constructor(ipp, nom, nommatri, prenoms, numcpam, datenaissance, adr1, adr2, cp, ville, tel, profession){
         this.p_adresses = {
             ligne1: adr1,
             ligne2: adr2,
             cp: cp,
             ville: ville
         }
         this.p_datenaissance = datenaissance;
         this.p_ipp = ipp;
         this.p_nom = nom;
         this.p_nommatri = nommatri;
         this.p_numcpam = numcpam;
         this.p_prenoms = prenoms;
         this.p_profession = profession;
         this.p_tel1 = tel;
    }
}
