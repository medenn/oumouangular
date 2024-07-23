import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PatientsComponent } from './patients/patients.component';
import { EventsComponent } from './events/events.component';
import { ComptaComponent } from './compta/compta.component';
import { ParametresComponent } from './parametres/parametres.component';
import { EmployesComponent } from './employes/employes.component';
import { EmpComponent } from './emp/emp.component';
import { StatComponent } from './stat/stat.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'*',component:PatientsComponent},
  {path:'',component:PatientsComponent},
  {path:'login',component:LoginComponent},
  {path:'profile/:id',component:ProfileComponent},
  {path:'patient',component:PatientsComponent},
  {path:'events',component:EventsComponent},
  {path:'compta',component:ComptaComponent},
  {path:'parametres',component:ParametresComponent},
  {path:'employes',component:EmployesComponent},
  {path:'stat',component:StatComponent},
  {path:'emp/:id',component:EmpComponent},
  {path:'**',component:PatientsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
