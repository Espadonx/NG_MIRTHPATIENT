import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

  public iPP;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    //let id = parseInt(this.route.snapshot.paramMap.get('id'));
    //this.iPP = id;
    this.route.paramMap.subscribe ((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.iPP = id;
    }) ;
  }

  public getBackToList(){
    this.router.navigate(['patientList']);
  }

}
