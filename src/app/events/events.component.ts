import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  stardate:any;
  enddate:any;
  stardaterech:any;
  enddaterech:any;
  events:any=[];
  eventsfiltrer:any=[];
  pages=1;
  randomNumber:any;
  note:any;
  etatselected:any;
  charg= "*/../assets/charg.gif";
  excel= "*/../assets/excel.png";
  logo= "*/../assets/logo.png";
  inchargement:any;
  username: any;
  role:any;
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe,private http: HttpClient) {
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
    this.getitem();
    const currentDate = new Date();
// Obtenez le début du mois actuel
this.stardate = this.datepipe.transform(  currentDate, 'yyyy-MM-dd');
    this.getlisetevents();
   }

  ngOnInit(): void {
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
  closetempinforendez(){
    const modal = document.getElementById('form') as HTMLElement;
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.removeAttribute('aria-modal');
    modal.removeAttribute('role');
  }

  getlisetevents(){
    this.inchargement=true;
    this.etatselected='Tous';
    let e:any;
    this.apiservice.getEventsByEDATE(this.stardate).subscribe(
      (data) => {
        this.inchargement=false;
        if(data!=null){
        this.events=data;
        this.filtreretat(e);
    this.stardaterech=this.stardate;
    this.enddaterech=null;
       
      }else{
        this.events=[];
        this.filtreretat(e);
     
      }
      },
      error => {
        this.events=[];
        this.filtreretat(e);
     
        console.error(error);
      });
  }

  getliseteventsbetweendate(){
    this.inchargement=true;
    this.etatselected='Tous';
    let e:any;
    this.apiservice.getEventsByEDATEBetween(this.stardate,this.enddate).subscribe(
      (data) => {
        this.inchargement=false;
        if(data!=null){
        this.events=data;
        this.filtreretat(e);
        this.stardaterech=this.stardate;
        this.enddaterech=this.enddate;
       
      }else{
        this.events=[];
        this.filtreretat(e);
      }
      },
      error => {
        this.events=[];
        this.filtreretat(e);
        console.error(error);
      });
  }


  
getMonthName(index: any): string {
  const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Vérifie que l'index est valide (entre 1 et 12)
 
      return months[index - 1]; // -1 car les index de tableau commencent à 0

}
getColorByStatus(status: string): string {
  switch (status) {
      case 'En attente':
          return 'black';
      case 'Annulé':
          return 'red';
      case 'Confirmé':
          return 'green';
      default:
          return 'black'; // couleur par défaut si aucune condition n'est remplie
  }
}

eventstat(id:any){

  Swal.fire({
   
    icon: 'info',
    title: "Mettre à jour l'état d'un rendez-vous !",
    showDenyButton: true,
  confirmButtonText: 'Confirmé',
  denyButtonText: 'Annulé',
}).then((result) => {

  if (result.isConfirmed) {
    let st='Confirmé';
    this.changeetat(id,st);
  } else  if (result.isDenied) {
    let st='Annulé';
    this.changeetat(id,st);
       
      
  }
})}

changeetat(id:any,st:any){
  
  this.apiservice.updateEventst(id,st).subscribe(
    (data) => {
     
      this.stardate = this.stardaterech;
      this.enddate=this.enddaterech;
 
      Swal.fire({
     
        icon: 'success',
        title: 'La mise à jour a été réalisée avec succès.',
      showCancelButton: false,
      confirmButtonText: 'OK',
      //cancelButtonText: 'No, keep it',
    })
    if((this.stardaterech && this.enddaterech)){
      this.getliseteventsbetweendate();
     
    }
    else {
      this.getlisetevents();
    }
    },
    error => {
      console.error(error);
    });
}

intialiseretat(id:any){
  let text = "Souhaitez-vous vraiment réinitialiser l'état du rendez-vous ?";
  if (confirm(text) == true) {
    let st='En attente';
    this.changeetat(id,st);
  }
}

chercher(){
  const start = new Date(this.stardate);
  const end = new Date(this.enddate);
  if (!this.stardate ) {
    alert('La date que vous avez entrée est invalide. Veuillez vérifier et réessayer.');
    return;
  }
  else if(this.stardate && !this.enddate){
    this.getlisetevents();

  }
  else if(this.stardate && this.enddate){
    this.getliseteventsbetweendate();
    if (start > end) {
      alert('La date de fin ne peut pas être antérieure à la date de début.');
      return;
    }else{

    }

  }

  

  

}

filtreretat(e:any){
  if(this.etatselected=='Tous'){
    this.eventsfiltrer= this.events;
  }else{
    this.eventsfiltrer = this.events.filter((ev: { estat: String  }) => 
      (ev.estat==this.etatselected)
  );
  }
}

exporttoexcel(){
  const wb = XLSX.utils.book_new();
const wsName = 'rendezvous';
const wsData = [];

// En-têtes de colonne
const headers = ['Nom /Prénom', 'Telephone', 'Date', 'Heure','État','Notes'];
wsData.push(headers);

// Remplissage des données pnai pdaj
this.eventsfiltrer.forEach((ev:any) => {

let edate :any=this.datepipe.transform(  ev?.edate, 'dd-MM-yyyy');
  const row = [
    ev?.pnom,
    ev?.ptel,
    edate,
    ev.etime,
    ev.estat,
    ev.enote
    
  ];
  wsData.push(row);
});

// Création d'une feuille de calcul
const ws = XLSX.utils.aoa_to_sheet(wsData);
ws['!cols'] = [
{ width: 30 }, { width: 12 }, { width: 12 }, { width: 10 },{ width: 12 },{ width: 40 }
];
XLSX.utils.book_append_sheet(wb, ws, wsName);

// Écriture des données dans un fichier Excel
const fileName = 'listrendezvous.xlsx';
XLSX.writeFile(wb, fileName);
}
getitem(){
  let t:any='token';
  this.username=this.apiservice.getItemWithExpiry(t);
  this.role=this.apiservice.getrole(t);
 
}
logout(){
  this.apiservice.deleteToken();
}
profilepage(id:any){
  const url = '/profile/' + id;
  window.open(url, '_blank');
}
}
