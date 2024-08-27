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
import { AuthGuard } from './auth-guard.service';
import { title } from 'process';

const routes: Routes = [
  {path:'*',component:LoginComponent},
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent, data:{title:'hi test'}},
  {path:'profile/:id',component:ProfileComponent,canActivate: [AuthGuard]},
  {path:'patient',component:PatientsComponent,canActivate: [AuthGuard]},
  {path:'events',component:EventsComponent,canActivate: [AuthGuard]},
  {path:'compta',component:ComptaComponent,canActivate: [AuthGuard]},
  {path:'parametres',component:ParametresComponent,canActivate: [AuthGuard]},
  {path:'employes',component:EmployesComponent,canActivate: [AuthGuard]},
  {path:'stat',component:StatComponent,canActivate: [AuthGuard]},
  {path:'emp/:id',component:EmpComponent,canActivate: [AuthGuard]},
  {path:'**',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
