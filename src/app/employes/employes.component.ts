import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  charg= "*/../assets/charg.gif";
  excel= "*/../assets/excel.png";
  sshow= "*/../assets/show.png";
  hide= "*/../assets/hidden.png";
  logo= "*/../assets/logo.png";
    modalRef: any;
    buttondisable=false;
    formAddemployes = new FormGroup({
        Nom: new FormControl('', Validators.required ),
        DENT: new FormControl('', Validators.required),
       FN: new FormControl('', Validators.required ),
        TL: new FormControl('', Validators.required ),
       SAL: new FormControl('', Validators.required ),
       
         
      });
      inchargement:any=true;
      inchargementpoint:any=true;
      jourpoint:any;
      listemployes:any=[];
      listemployesFiltree:any=[];
      stemp:any='encours';
      Newemployes:any;
      pages=1;
      tel:any='';
      randomNumber:any;
      foncts:any=[];
      show:any;
      salaireinfos:any=[];
      salaire:any=[];
      sumTtlt=0;
      date:any=new Date();
    
      bulltins:any;
      role:any;
      joursFrancais = ["L", "M", "M", "J", "V", "S", "D"];
      joursDuMois: number[] = [];
  semaines: any[] = [];
  moisAnnee: string = '';
  dateActuelle :any;
  pagepointage:any=1;
  pointagelist:any=[];
  note:any;

 monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
 month :any;
 year :any;
  username: any;
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe) {
    this.date=this.datepipe.transform(  this.date, 'yyyy-MM');
    this.getitem();
    this.listfoncts();
    this.getlistemployes();
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
   }

  ngOnInit(): void {
  }
tempaddemp(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddemployes.reset();
    this.buttondisable=false;
}

tempinforendez(enote:any){
  const modal = document.getElementById('form') as HTMLElement;
    // Ajouter la classe 'show' au modal pour l'afficher
    modal.classList.add('show');
    // Ajouter les attributs nécessaires pour rendre le modal visible
    modal.style.display = 'block';
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');
    this.note=enote;
}
closetempnote(id:any){
  const modal = document.getElementById(id) as HTMLElement;
  modal.classList.remove('show');
  modal.style.display = 'none';
  modal.removeAttribute('aria-modal');
  modal.removeAttribute('role');
}
closetempinforendez(){
  const modal = document.getElementById('form') as HTMLElement;
  modal.classList.remove('show');
  modal.style.display = 'none';
  modal.removeAttribute('aria-modal');
  modal.removeAttribute('role');
}
tempdetailpointage(jour:any) {

  const myDialog :any= document.querySelector('#details');
  myDialog.showModal();
 this.pagepointage=1;

  this.jourpoint=jour;
  const mois = this.dateActuelle.getMonth()+1; // Mois actuel (0-11)
  const annee = this.dateActuelle.getFullYear(); // Année actuelle
  
 let date=annee+'-'+mois+'-'+jour;
 this.listpointage(date);
}

closed(id:any){
  const myDialog :any= document.querySelector(id);
  myDialog.close(); 
  
}
temppoint(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
    
  );
  this.dateActuelle = new Date();
  this.genererCalendrier( );
  
}
toggleNavbar() {
  const showNavbar = (toggleId: string, navId: string, bodyId: string, headerId: string) => {
      const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId),
          bodypd = document.getElementById(bodyId),
          headerpd = document.getElementById(headerId);
         const logo :any= document.getElementById('logo');
       

      // Validate that all variables exist
      if (toggle && nav && bodypd && headerpd ) {
        
              // show navbar
              nav.classList.toggle('show');
              // change icon
              toggle.classList.toggle('bx-x');
              // add padding to body
              bodypd.classList.toggle('body-pd');
              // add padding to header
              headerpd.classList.toggle('body-pd');
              // toggle logo size
      if (logo.width === 0) {
        logo.width = 180;
        logo.height = 44;
      } else {
        logo.width = 0;
        logo.height = 0;
      }
             
        
      }
  };

  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

  
}

exporttoexcel(){
  const wb = XLSX.utils.book_new();
const wsName = 'Employes';
const wsData = [];

// En-têtes de colonne
let headers:any;
if(!this.show){
headers = ['Nom /Prénom', 'Telephone', 'Fonction', 'Salaire',"Date D'entrée"];
}else{
  headers = ['Nom /Prénom', 'SALAIRE', 'PRIME', 'ABSENCE',"AVSS","PRÊT","CONGÉ","NET À PAYER"];
}
wsData.push(headers);
if(!this.show){
// Remplissage des données pnai pdaj
this.listemployesFiltree.forEach((emp:any) => {
let edent :any=this.datepipe.transform(  emp?.edent, 'dd-MM-yyyy');
let fn=this.getfnById(emp.efn);

  const row = [
    emp?.enom,
   emp?.etel,
    fn,
    emp?.esal,
    edent 
      
  ];
  wsData.push(row);
});

}else{
  this.listemployesFiltree.forEach((emp:any) => {
    let fn=this.getfnById(emp.efn);
    
      const row = [
        emp?.enom,
        emp?.sal,
       emp?.prim,
       emp?.absmont,
       emp.sous,
       emp.pret,
       emp.conger,
       emp.tt
          
      ];
      wsData.push(row);
    });
}

// Création d'une feuille de calcul
if(this.show){
const totalRow = ['Total',this.calculateFilteredTotal()];
wsData.push(totalRow);}
const ws = XLSX.utils.aoa_to_sheet(wsData);
if(!this.show){
ws['!cols'] = [
{ width: 30 }, { width: 12 }, { width: 20 }, { width: 12 },{ width: 20 }
];
}else{
  ws['!cols'] = [
    { width: 30 }, { width: 14 }, { width: 14 }, { width: 14 },{ width:14 },{ width:14 },{ width:14 },{ width:14 }
    ];
}
XLSX.utils.book_append_sheet(wb, ws, wsName);

// Écriture des données dans un fichier Excel
const fileName = 'listeemployes.xlsx';
XLSX.writeFile(wb, fileName);
}
search(){
  
  this.apiservice.Employestel(this.tel)
  .subscribe(
    (data) => {
     this.tel='';
      let id=data.eid;
      this.router.navigate(['/emp/'+id]);
     
    },
    error => {
      this.error();
     
     
    }); 
}
error(){
  Swal.fire({
   
    icon: 'error',
    title: 'pas de resultat !',
  showCancelButton: false,
  confirmButtonText: 'OK',
  //cancelButtonText: 'No, keep it',
}).then((result) => {

  if (result.isConfirmed) {
   
  } 
})
}
profilepage(id:any){
  const url = '/emp/' + id;
  window.open(url, '_blank');
}
listemployesFiltred(){
  if(this.stemp=='encours'){
    this.listemployesFiltree = this.listemployes.filter((emp: { est: String  }) => 
      (emp.est=='encours')
  );
  }else{
    this.listemployesFiltree =  this.listemployes;}
  }
stchanged(e:any){
  this.stemp=e;
  this.listemployesFiltred();
}

addempl(){
  if(this.formAddemployes.valid){
    this.buttondisable=true;
    const currentDate: Date = new Date();
    this.Newemployes={
      enom:this.formAddemployes.get('Nom')?.value,
      etel:this.formAddemployes.get('TL')?.value,
      efn:this.formAddemployes.get('FN')?.value,
      edent:this.formAddemployes.get('DENT')?.value,
      esal:this.formAddemployes.get('SAL')?.value,
      est:'encours',
    }
  if((this.Newemployes.etel).toString().length !== 8) { 
    alert("le numéro de téléphone doit être de 8 chiffres");
    this.buttondisable=false;
    return;
   }
    this.apiservice.addEmployes(this.Newemployes)
    .subscribe(
      (data) => {
        this.buttondisable=false;
        let id=data.eid;
        this.router.navigate(['/emp/'+id]);
        this.modalRef.hide();
      },
      error => {
        this.buttondisable=false;
        alert("réessayer");
    
       
      }); 

    
  }

}

async getlistemployes() {
  this.inchargement = true;
  let annee = this.datepipe.transform(this.date, 'yyyy');
    let mois: any = this.datepipe.transform(this.date, 'MM');
  this.month = this?.monthNames[mois - 1];
    this.year = annee;
  
  try {
      const data = await new Promise((resolve, reject) => {
          this.apiservice.Employes().subscribe(
              (data) => {
                  resolve(data);
                
              },
              (error) => {
                  console.error(error);
                  reject(error);
              }
          );
      });
      
      this.listemployes = data;
      this.listemployesFiltred();
      await this.getbulltinbydate();
   
  } catch (error) {
      console.error(error);
      this.inchargement = false;
  }
}
listfoncts(){
  this.apiservice.Fonction().subscribe(
    (data) => {
      
      if(data!=null){
      this.foncts=data;
      
     
    }else{
      this.foncts=[];
    }
    },
    error => {
      console.error(error);
    });
}
getfnById(id: any) {
  
  let a:any=this.foncts.find((item: { fid: number; }) => item.fid == id);
  return a?.fnm;
 }
 showhiden() {
  this.show = !this.show;
}
async calculbulletin() {
  this.sumTtlt=0;
  // this.openModalsal(this.templatepatien);
  this.inchargement=true;
  const annee = this.datepipe.transform(this.date, 'yyyy');
  const mois: any = this.datepipe.transform(this.date, 'MM');

  if ( this.listemployesFiltree.length !== 0) {
    for (const emp of  this.listemployesFiltree) {
      try {
     
        
        const empid = emp.eid;
        const index =  this.listemployesFiltree.indexOf(emp);
        const sal = emp.esal ;
        const edaj=emp.edent;

       
        await this.apiservice.delbulletin(empid, annee, mois).toPromise();
        await this.calculsal(empid, annee, mois, sal,edaj,  index,  this.listemployesFiltree.length);
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    this.error();
  }
}

async calculsal(empid :any,annee:any,mois:any,sal:any,daj:any,i:any,length:any) {
  try {
  
    await this.getSalaryInfo(empid, annee, mois,sal,daj);
    await this.addBulletin(i,length);
  } catch (error) {
    console.error(error);
  }
}

async getSalaryInfo(empid: any, annee: any, mois: any,empsalaire:any,daj:any) {
  try {
    let datent = this.datepipe.transform(  daj, 'MM-yyyy');
  
    let dat = new Date(mois+'/01/'+annee);
    let datesal  = this.datepipe.transform(  dat, 'MM-yyyy');
    dat.setMonth( dat.getMonth()+1)
   let annee2 = this.datepipe.transform(  dat, 'yyyy');
  let mois2 = this.datepipe.transform(  dat, 'MM');
  let nbrjrretard:any;
  if(  datent===datesal){
   nbrjrretard = this.datepipe.transform(  daj, 'dd');
    nbrjrretard=nbrjrretard-1;
  
  }else{
    nbrjrretard=0;
  }
  

    const data = await this.apiservice.salaireinfo(empid, annee, mois,annee2,mois2).toPromise();
    
    if(data.abcong!=null){
      
      await this.calculmoiscong(empid,annee,mois,data,0,empsalaire)
     
    }else{ 
      //calcul salaire 
     
      this.salaire.abtaux= 30-data.ab-nbrjrretard;
      
      this.salaire.salaire= (empsalaire*this.salaire.abtaux)/30; // salaire ce mois ci
      
      this.salaire.absmontant= (empsalaire*(data.ab+nbrjrretard))/30; // absence montant
    

//verifier conger ou non
 if(data.checkabscong==false){

  this.salaire.indcongmont= empsalaire ; //conger montant
  this.salaire.pret = data.avmcrd //pret 
  this.salaire.sous=data.avm+data.avmcong; // (avancevantconger+avanceinconger)
  
}else{

  this.salaire.indcongmont= 0;
  this.salaire.pret = data.avmcrd //pret 
  this.salaire.sous=data.avm // (avancevantconger)
}


 this.salaire.prim=data.primmnt;

 this.salaire.sal=empsalaire;


this.salaire.netpayer =  this.salaire.salaire + this.salaire.indcongmont+this.salaire.pret-this.salaire.sous+this.salaire.prim;
 
this.salaireinfos={
  bide:empid,
  bannee : annee,
  bmois : mois,
  sal:this.salaire.sal ,
  conger:this.salaire.indcongmont,
  pret:this.salaire.pret,
  sous:this.salaire.sous,
  prim:this.salaire.prim,
  absmont:this.salaire.absmontant,
  netpayer:this.salaire.netpayer
  }

}
  
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async calculmoiscong(empid:any,annee:any,mois:any,data:any,daycong:any,empsalaire:any){
 
  let nbjr = data.abcong - data.ab;
  this.salaire.abtaux =nbjr ;
  this.salaire.salaire = (empsalaire * this.salaire.abtaux) / 30;
  this.salaire.absmontant = (empsalaire * daycong) / 30;
  
  this.salaire.indcongmont = 0;


  this.salaire.pret = data.avmcrd;
  this.salaire.sous=0;
  this.salaire.prim=data.primmnt;
  this.salaire.sal =empsalaire;
 
 this.salaire.netpayer =   this.salaire.salaire  +this.salaire.pret+this.salaire.prim;


  this.salaireinfos = {
    bide:empid,
    bannee : annee,
    bmois : mois,
  sal:this.salaire.salaire,
  conger:0,
  pret:this.salaire.pret,
  sous:0,
  prim:this.salaire.prim,
  absmont:this.salaire.absmontant,
  netpayer:this.salaire.netpayer 
  };
}

async addBulletin(i:any,length:any) {
  try {
    this.sumTtlt=this.sumTtlt+this.salaireinfos.netpayer;
   // console.log(this.salaireinfos);
    const data = await this.apiservice.addbulletin(this.salaireinfos).toPromise();
    if(i===length-1){ 
      /* setTimeout(() => {
        
        this.modalRef.hide();
      }, 1000); */
      this.inchargement=false;
      this.getlistemployes();

              }
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async getinfobydate(e:any){
await this.getbulltinbydate();

}
async getbulltinbydate() {
  this.inchargement = true;
  let annee = this.datepipe.transform(this.date, 'yyyy');
  let mois: any = this.datepipe.transform(this.date, 'MM');
  this.bulltins=[];
  
  try {
      const data = await new Promise((resolve, reject) => {
          this.apiservice.getbulltinbydate(mois, annee).subscribe(
              (data) => resolve(data),
              (error) => reject(error)
          );
      });

      this.bulltins = data;

      if (Array.isArray(this.listemployes)) {
        
          for (let i = 0; i < this.listemployes.length; i++) {
           
              await this.salaireinfo(this.listemployes[i].eid,this.listemployes[i].esal, i);
          }
      }
  } catch (error) {
      console.error(error);
      this.bulltins = [];
  } finally {
      this.inchargement = false;
  }
}
async salaireinfo(empid: any,salaire:any, i: any): Promise<void> {
  return new Promise<void>((resolve) => {
  
      const data =  this.bulltins?.find((item: { bide: any; }) => item.bide === empid);
    
      if (data !== null && data !== undefined) {
       
          const 
          
          { sal,absmont, sous, pret, conger, prim, netpayer} = data;
          this.listemployes[i].sal = sal;
          this.listemployes[i].prim=prim;
          this.listemployes[i].absmont = absmont;
          this.listemployes[i].conger = conger;
          this.listemployes[i].pret = pret;
          this.listemployes[i].sous = sous;
          this.listemployes[i].tt = netpayer;
      } else {
        this.listemployes[i].sal = salaire;
          this.listemployes[i].prim=0;
          this.listemployes[i].absmont = 0;
          this.listemployes[i].conger = 0;
          this.listemployes[i].pret = 0;
          this.listemployes[i].sous = 0;
          this.listemployes[i].tt = 0;
      }
      resolve(); // Résoudre la promesse une fois le traitement terminé
  }).catch(error => {
      console.error(error);
      this.listemployes[i].sal = salaire;
      this.listemployes[i].prim=0;
      this.listemployes[i].absmont = 0;
      this.listemployes[i].conger = 0;
      this.listemployes[i].pret = 0;
      this.listemployes[i].sous = 0;
      this.listemployes[i].tt = 0;
      // resolve(); // Toujours résoudre la promesse même en cas d'erreur
  });
}

calculateFilteredTotal() {

  return this.listemployesFiltree.reduce((acc: any, curr: { tt: any; }) => acc + (curr.tt || 0), 0);
}
getitem(){
  let t:any='token';
  this.username=this.apiservice.getItemWithExpiry(t);
  this.role=this.apiservice.getrole(t);
 
}
logout(){
  this.apiservice.deleteToken();
}

moisPrecedent() {
  this.dateActuelle.setMonth(this.dateActuelle.getMonth() - 1);
  this.genererCalendrier();
}

moisSuivant() {
  this.dateActuelle.setMonth(this.dateActuelle.getMonth() + 1);
  this.genererCalendrier();
}
genererCalendrier( ) {
  this.joursDuMois = [];
  this.semaines = [];
  this.moisAnnee= '';
  const mois = this.dateActuelle.getMonth(); // Mois actuel (0-11)
  const annee = this.dateActuelle.getFullYear(); // Année actuelle
  this.moisAnnee = `${this.obtenirNomMois(mois)} - ${annee}`;

  const premierJour = new Date(annee, mois, 1).getDay(); // Premier jour du mois (0-6)
  const nbreJours = new Date(annee, mois + 1, 0).getDate(); // Nombre de jours dans le mois

  let jourSemaine = (premierJour + 6) % 7; // Pour démarrer la semaine avec lundi

  // Remplir les jours du mois
  for (let i = 0; i < jourSemaine; i++) {
    this.joursDuMois.push(0); // Ajouter des zéros pour les jours vides avant le premier jour du mois
  }
  for (let jour = 1; jour <= nbreJours; jour++) {
    this.joursDuMois.push(jour);
  }

  // Remplir les jours suivants avec des zéros pour compléter la semaine
  while (this.joursDuMois.length % 7 !== 0) {
    this.joursDuMois.push(0);
  }

  // Diviser les jours en semaines
  for (let i = 0; i < this.joursDuMois.length; i += 7) {
    this.semaines.push(this.joursDuMois.slice(i, i + 7));
  }
}

obtenirNomMois(mois: number): string {
  const moisFrancais = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  return moisFrancais[mois];
}
estJourActuel(jour: number): boolean {
  const aujourdHui = new Date();
  return jour === aujourdHui.getDate() &&
         this.dateActuelle.getMonth() === aujourdHui.getMonth() &&
         this.dateActuelle.getFullYear() === aujourdHui.getFullYear();
}

listpointage(date:any){
  this.inchargementpoint=true;
  this.apiservice.pointagebydate(date).subscribe(
    (data) => {
      this.inchargementpoint=false;
      if(data!=null){
      this.pointagelist=data;
      
     
    }else{
      this.pointagelist=[];
    }
    },
    error => {
      console.error(error);
    });
}

}
