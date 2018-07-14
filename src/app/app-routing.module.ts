import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { AdmissionCreateComponent } from './admission-create/admission-create.component';
import { AdmissionManageComponent } from './admission-manage/admission-manage.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientEpicsearchComponent } from './patient-epicsearch/patient-epicsearch.component';
import { PatientSeeAdmissionsComponent } from './patient-see-admissions/patient-see-admissions.component';

const routes: Routes = [
  {path: "patientList", component: PatientListComponent},
  {path: "patientCreate", component: PatientCreateComponent},
  {path: "patient/:id", component: PatientEditComponent}, //On passe un ID en paramètre
  {path: "admissionCreate", component: AdmissionCreateComponent},
  {path: "admission/:id", component: AdmissionManageComponent},
  {path: "epicSearchpatient", component: PatientEpicsearchComponent},
  {path: "patient-admissions/:id", component: PatientSeeAdmissionsComponent},
  {path: "**", component:PatientListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  PatientListComponent,
  PatientCreateComponent,
  AdmissionCreateComponent,
  AdmissionManageComponent,
  PatientEditComponent,
  PatientEpicsearchComponent,
  PatientSeeAdmissionsComponent
]
