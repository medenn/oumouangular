import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  redirectUrl:any;
  StorageItem:any;

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
  public listpatient(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/listpatient');
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

  modpatientimg(img : any,id:any): Observable<any>{
    return this.http.put(this.baseUrl + '/modpatientimg/'+id+'/'+img,null);
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

  deleteEventsAfterEdate(epid: any,edate:any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deleteEventsAfterEdate/'+epid+'/'+edate);
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
  addModepaiement(Modepaiement: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addModepaiement',Modepaiement);
  }
  
  updateModepaiement(id: any, Modepaiement: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateModepaiement/' + id, Modepaiement);
  }

//paiement
Paiement(): Observable<any> { 
  return this.http.get<any>(this.baseUrl + '/Paiements');
}
Paiementsnonvalide(): Observable<any> { 
  return this.http.get<any>(this.baseUrl + '/Paiementsnonvalide');
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

  updatePaiementvalide(id: any, valide: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updatePaiementvalide/' + id,valide);
  }

  deletePaiement(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deletePaiement/' + id);
  }


  //seances

  Seancess(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/Seancess');
  }

  Seancessnonvalide(): Observable<any> { 
    return this.http.get<any>(this.baseUrl + '/Seancessnonvalide');
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

    updateSeancesvalide(id: any, valide: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updateSeancesvalide/' + id,valide);
    }
  
    deleteSeances(id: any): Observable<any> {
      return this.http.delete<any>(this.baseUrl + '/deleteSeances/' + id);
    }


    //dossiers

    dossiersnonvalide(): Observable<any> { 
      return this.http.get<any>(this.baseUrl + '/dossiersnonvalide');
    }

    getDossiersbypid(pid: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/Dossiersbypid/' + pid);
    }
  
  
    addDossiers(Dossier: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/addDossiers', Dossier);
    }
  
    updateDossiers(id: any, Dossier: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updateDossiers/' + id,Dossier);
    }

    updateDrendez(id: any, Dossier: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updateDrendez/' + id,Dossier);
    }
  
    deleteDossiers(id: any): Observable<any> {
      return this.http.delete<any>(this.baseUrl + '/deleteDossiers/' + id);
    }

    updateDvalide(id: any, valide: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updateDvalide/' + id,valide);
    }

    dossierparassurance(dassurid:any,startDate: any, endDate: any): Observable<any> {
      return this.http.get<any>(this.baseUrl + '/dossierparassurance/'+dassurid+'/'+ startDate+'/'+endDate);
    }
  

    //employes

    public Employesid(id:any): Observable<any> { 
      return this.http.get<any>(this.baseUrl + '/Employesid/'+id);
     }
     public Employestel(tel:any): Observable<any> { 
      return this.http.get<any>(this.baseUrl + '/Employestel/'+tel);
     }
     public Employes(): Observable<any> { 
      return this.http.get<any>(this.baseUrl + '/Employes');
    }
    addEmployes(Employes : any): Observable<any>{
      return this.http.post(this.baseUrl + '/addEmployes',Employes);
    }
    modEmployes(Employes : any,id:any): Observable<any>{
      return this.http.put(this.baseUrl + '/modEmployes/'+id,Employes);
    }
    modEmployest(st : any,id:any): Observable<any>{
      return this.http.put(this.baseUrl + '/modEmployest/'+id+'/'+st,null);
    }
    modEmployeimg(img: any,id:any): Observable<any>{
      return this.http.put(this.baseUrl + '/modEmployeimg/'+id+'/'+img,null);
    }
    delEmployes(id : any): Observable<any>{
      return this.http.delete(this.baseUrl + '/delEmployes/'+id);
    }
    uploadFileEmp(formData:any,id:any): Observable<any>{
      return this.http.post(this.baseUrl + '/uploadFileEmp/'+id,formData);
    }

    //Primes

  Primes(pide:any,month:any,year:any): Observable<any> { 
    const params = new HttpParams()
    .set('pide', pide)
    .set('month', month)
    .set('year', year);
    return this.http.get<any>(this.baseUrl + '/Primes',{params});
  }
    
  addPrimes(Prime: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/addPrimes',Prime);
    }
  
    updatePrimes(id: any, prime: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updatePrimes/' + id,prime);
    }
  
    deletePrimes(id: any): Observable<any> {
      return this.http.delete<any>(this.baseUrl + '/deletePrimes/' + id);
    }

    PrimesByPIDE(id : any): Observable<any>{
      return this.http.get(this.baseUrl + '/PrimesByPIDE/'+id);
    }
    //Absences
    AbsencesByAIDE(id : any): Observable<any>{
      return this.http.get(this.baseUrl + '/AbsencesByAIDE/'+id);
    }
  Absences(aide:any,month:any,year:any): Observable<any> { 
    const params = new HttpParams()
    .set('aide', aide)
    .set('month', month)
    .set('year', year);
    return this.http.get<any>(this.baseUrl + '/Absences',{params});
  }
    
  addAbsences(Absences: any): Observable<any> {
      return this.http.post<any>(this.baseUrl + '/addAbsences',Absences);
    }
  
    updateAbsences(id: any, Absences: any): Observable<any> {
      return this.http.put<any>(this.baseUrl + '/updateAbsences/' + id, Absences);
    }
  
    deleteAbsences(id: any): Observable<any> {
      return this.http.delete<any>(this.baseUrl + '/deleteAbsences/' + id);
    }

  //avances

  addAvance(Avance: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addAvance',Avance);
  }

  updateAvance(id: any, avance: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateAvance/' + id,avance);
  }

  updateAvancedetail(id: any, avance: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateAvancedetail/' + id,avance);
  }


  deleteAvance(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deleteAvance/' + id);
  }

  AvanceByAIDE(id : any): Observable<any>{
    return this.http.get(this.baseUrl + '/AvanceByAIDE/'+id);
  }

  salaireinfo(empid: any,annee:any,mois :any,annee2:any,mois2:any): Observable<any>{
  
    return this.http.get<any>(this.baseUrl + '/salaireinfo/'+empid+'/'+annee+'/'+mois+'/'+annee2+'/'+mois2);
  }

 
  
 findbulletin(empid: any,mois:any,annee :any): Observable<any>{
  
    return this.http.get<any>(this.baseUrl + '/findbulletin/'+empid+'/'+mois+'/'+annee);
  }
  delbulletin(empid : any,annee:any,mois:any): Observable<any>{
    return this.http.delete(this.baseUrl + '/deltbulletin/'+empid+'/'+annee+'/'+mois);
  } 
  addbulletin(bulletin : any): Observable<any>{
    return this.http.post(this.baseUrl + '/addbulletin',bulletin);
  }

  getbulltinbydate(month:any,year:any): Observable<any> { 
    const params = new HttpParams()
    .set('month', month)
    .set('year', year);
    return this.http.get<any>(this.baseUrl + '/bulletins',{params});
  }

  stat(date1:any,date2:any): Observable<any>{
    return this.http.get(this.baseUrl + '/stat/'+date1+'/'+date2);
  }

  statglobal(): Observable<any>{
    return this.http.get(this.baseUrl + '/statglobal');
  }

  //consultation

  getconsultationbypid(pid: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Consultationbypid/' + pid);
  }


  addConsultation(Consultation: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/addConsultation', Consultation);
  }

  updateConsultation(id: any, Consultation: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/updateConsultation/' + id,Consultation);
  }

  deleteConsultation(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/deleteConsultation/' + id);
  }
// events create

createevent(ndos:any,idp:any,datedb:any): Observable<any>{
  return this.http.get(this.baseUrl + '/createevent/'+ndos+'/'+idp+'/'+datedb);
}

// pointage

pointagebyid(id: any): Observable<any> {
  return this.http.get<any>(this.baseUrl + '/pointagebyid/' + id);
}

pointagbyeid(eid: any): Observable<any> {
  return this.http.get<any>(this.baseUrl + '/pointagbyeid/' + eid);
}

pointagebydate(pdate: any): Observable<any> {
  return this.http.get<any>(this.baseUrl + '/pointagebydate/' + pdate);
}


addpointage(pointage: any): Observable<any> {
  return this.http.post<any>(this.baseUrl + '/addpointage', pointage);
}

updatepointage(id: any, pointage: any): Observable<any> {
  return this.http.put<any>(this.baseUrl + '/updatepointage/' + id,pointage);
}


deletepointage(id: any): Observable<any> {
  return this.http.delete<any>(this.baseUrl + '/deletepointage/' + id);
}
  login(username:any,password:any): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/login/'+username+'/'+password).pipe(map(Users => {

      //this.setToken(username);
      // Exemple d'utilisation
const key = "token";
const value = username;
const role=Users.role;
const ttl = 120 * 60 * 1000; // 15 minutes en millisecondes

// Stocker une donnée avec expiration
      this.setItemWithExpiry(key, value,role, ttl);

      this.getLoggedInName.emit(true);
      
      }));
  }

  //token
setToken(token: string) {
  localStorage.setItem('token', token);
  }
  
  getToken() {
  return localStorage.getItem('token');
  }
  deleteToken() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      this.StorageItem = JSON.parse(usertoken);
  const now = Date.now(); // Obtenir la timestamp actuelle

  // Vérifier si la donnée est expirée
  if (now > this.StorageItem.expiry) {
    localStorage.removeItem(usertoken);
    this.router.navigate(['/login']);
    return false;
  }else{
    return true
  }
   
    
    }
    this.router.navigate(['/login']);
    return false;
    }

    // Fonction pour stocker une donnée avec expiration
setItemWithExpiry(key: string, value: string, role: string,ttl: number): void {
  const now = Date.now(); // Obtenir la timestamp actuelle
 this.StorageItem = {
    value: value,
    role:role,
    expiry: now + ttl, // Définir l'expiration en ajoutant ttl à la timestamp actuelle
  };
  localStorage.setItem(key, JSON.stringify(this.StorageItem));
}


//Fonction pour récupérer une donnée
getItemWithExpiry(key: string): any | null {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

 this.StorageItem = JSON.parse(itemStr);
  const now = Date.now(); // Obtenir la timestamp actuelle
 
  // Vérifier si la donnée est expirée
  if (now > this.StorageItem.expiry) {
    localStorage.removeItem(key);
    return null;
   
  }else{
  }

  return this.StorageItem.value;
}

getrole(key: string): any | null {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }

 this.StorageItem = JSON.parse(itemStr);
 

  return this.StorageItem.role;
}



}
