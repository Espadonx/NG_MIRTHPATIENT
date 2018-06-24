import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { AdmissionCreateComponent } from './admission-create/admission-create.component';
import { AdmissionManageComponent } from './admission-manage/admission-manage.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';

const routes: Routes = [
  {path: "patientList", component: PatientListComponent},
  {path: "patientCreate", component: PatientCreateComponent},
  {path: "patient/:id", component: PatientEditComponent}, //On passe un ID en paramètre
  {path: "admissionCreate", component: AdmissionCreateComponent},
  {path: "admissionManage", component: AdmissionManageComponent},
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
  PatientEditComponent
]
