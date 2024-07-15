import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  redirectUrl:any;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  baseUrl:string = environment.apiURL;
  constructor(private http: HttpClient,private router:Router) {
    
    
   }

   public patientsid(id:any): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/patientsid/'+id);
   }
   public patientstel(tel:any): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/patientstel/'+tel);
   }
   public patients(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/patients');
  }
  addpatient(patient : any): Observable<any>{
    return this.http.post(this.baseUrl + '/addpatient',patient);
  }
  modpatient(patient : any,id:any): Observable<any>{
    return this.http.put(this.baseUrl + '/modpatient/'+id,patient);
  }
  modpatientst(st : any,id:any): Observable<any>{
    return this.http.put(this.baseUrl + '/modpatientst/'+id+'/'+st,null);
  }
  delpatient(id : any): Observable<any>{
    return this.http.delete(this.baseUrl + '/delpatient/'+id);
  }
  uploadfile(formData:any,id:any): Observable<any>{
    return this.http.post(this.baseUrl + '/uploadFile/'+id,formData);
  }

  //


  listdocs(directory: string): Observable<any> {
    const params = new HttpParams().set('directory', directory);
    return this.http.get<any>(`${this.baseUrl}/listdocs`, { params });
  }

  deletefile(directorypath: string,fileName: string): Observable<any> {
    const params = new HttpParams()
      .set('directorypath', directorypath);
    return this.http.delete(this.baseUrl + '/deletefile/'+fileName,{ params });
  }

  renamefile(directorypath:string,oldFileName: string, newFileName: string): Observable<any> {
    const params = new HttpParams()
    .set('directorypath',directorypath)
    .set('oldFileName', oldFileName)
    .set('newFileName', newFileName);
    return this.http.post(`${this.baseUrl}/renamefile`, null, { params });
  }
  uploadFiledoc(formData:any,docname:any,directorypath:any): Observable<any>{
    const params = new HttpParams().set('directorypath', directorypath);
    return this.http.post(this.baseUrl + '/uploadFiledoc/'+docname,formData,{ params });
  }

  adddossieradmin(dossiername: string, directorypath: string): Observable<any> {
    const params = new HttpParams()
      .set('dossiername', dossiername)
      .set('directorypath', directorypath);
    return this.http.post<any>(`${this.baseUrl}/createdossier`, null, { params });
  }
  
  //
  getEventById(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/eventbyid/' + id);
  }

  getEventsByPID(pid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/eventbypid/' + pid);
  }

  getEventsByEDATE(edate: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/eventbydate/' + edate);
  }

  getEventsByEDATEBetween(startDate: any, endDate: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/eventstwodate/' + startDate+'/'+endDate);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addevent', event);
  }

  updateEvent(id: any, event: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateevent/' + id, event);
  }

  updateEventst(id: any, stat: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateeventst/' + id + '/' + stat, null);
  }

  deleteEvent(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deleteevent/' + id);
  }

  Traitement(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/Traitement');
  }
  addTraitement(triatement: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addTraitement', triatement);
  }

  updateTraitement(id: any, traitement: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateTraitement/' + id, traitement);
  }


  deleteTraitement(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deleteTraitement/' + id);
  }

  Assurance(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/Assurance');
  }
  addAssurance(Assurance: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addAssurance',Assurance);
  }

  updateAssurance(id: any, Assurance: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateAssurance/' + id, Assurance);
  }


  deleteAssurance(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deleteAssurance/' + id);
  }

  Fonction(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/Fonction');
  }
  addFonction(Fonction: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addFonction',Fonction);
  }

  updateFonction(id: any, Fonction: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateFonction/' + id, Fonction);
  }


  deleteFonction(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deleteFonction/' + id);
  }

  Modepaiement(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/Modepaiement');
  }

//paiement
Paiement(): Observable<any> { 
  return this.http.get<any>(this.baseUrl + '/Paiements');
}
  getPaiementbypdos(pdos: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Paiementbypdos/' + pdos);
  }

  getPaiementbydate(pdate: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Paiementbydate/' + pdate);
  }

  getPaiementtwodate(startDate: any, endDate: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Paiementtwodate/' + startDate+'/'+endDate);
  }

  addPaiement(paiement: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addPaiement', paiement);
  }

  updatePaiement(id: any, paiement: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updatePaiement/' + id,paiement);
  }

  deletePaiement(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deletePaiement/' + id);
  }


  //seances

  Seancess(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/Seancess');
  }
    getSeancesbysdos(pdos: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/Seancesbysdos/' + pdos);
    }
  
    getSeancesbydate(pdate: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/Seancesbydate/' + pdate);
    }
  
    getSeancestwodate(startDate: any, endDate: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/Seancestwodate/' + startDate+'/'+endDate);
    }
  
    addSeance(Seance: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/addSeances', Seance);
    }
  
    updateSeances(id: any, paiement: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updateSeances/' + id,paiement);
    }
  
    deleteSeances(id: any): Observable<any> {
      return this.http.delete<any>(this.baseUrl + '/deleteSeances/' + id);
    }


    //dossiers

    getDossiersbypid(pid: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/Dossiersbypid/' + pid);
    }
  
  
    addDossiers(Dossier: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/addDossiers', Dossier);
    }
  
    updateDossiers(id: any, Dossier: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updateDossiers/' + id,Dossier);
    }
  
    deleteDossiers(id: any): Observable<any> {
      return this.http.delete<any>(this.baseUrl + '/deleteDossiers/' + id);
    }
  

}
