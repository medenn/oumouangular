import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PatientsComponent } from './patients/patients.component';
import { EventsComponent } from './events/events.component';
import { ComptaComponent } from './compta/compta.component';
import { ParametresComponent } from './parametres/parametres.component';

const routes: Routes = [

  {path:'profile/:id',component:ProfileComponent},
  {path:'patient',component:PatientsComponent},
  {path:'events',component:EventsComponent},
  {path:'compta',component:ComptaComponent},
  {path:'parametres',component:ParametresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
