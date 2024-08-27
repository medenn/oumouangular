import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { PatientsComponent } from './patients/patients.component';
import { EventsComponent } from './events/events.component';
import { ComptaComponent } from './compta/compta.component';
import { ParametresComponent } from './parametres/parametres.component'; 
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatePipe } from '@angular/common';
import { EmployesComponent } from './employes/employes.component';
import { EmpComponent } from './emp/emp.component';
import { StatComponent } from './stat/stat.component';
import { LoginComponent } from './login/login.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PatientsComponent,
    EventsComponent,
    ComptaComponent,
    ParametresComponent,
    EmployesComponent,
    EmpComponent,
    StatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot() // Add this line to your imports
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
