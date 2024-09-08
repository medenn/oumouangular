import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  charg= "*/../assets/charg.gif";
  excel= "*/../assets/excel.png";
  logo= "*/../assets/logo.png";
    modalRef: any;
    buttondisable=false;
    formAddpatient = new FormGroup({
        Nom: new FormControl('', Validators.required ),
        DN: new FormControl('', Validators.required),
        GNR: new FormControl('', Validators.required ),
        TL: new FormControl('', Validators.required ),
        ADRS: new FormControl('', Validators.required ),
       
         
      });
      inchargement:any=true;
      listpatients:any=[];
      listpatientFiltree:any=[];
      stpatient:any='encours';
      Newpatient:any;
      pages=1;
      tel:any='';
      randomNumber:any;
      username:any;
      role:any;
      datapatient:any=[];
      keyword = 'name';
      @ViewChild('auto') auto: any;
      traitselected:any;
      listtrait:any=[];
      traiid:any='Tous';
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe ) {
  this.getitem();
    this.listpatient();
    this.listrait();
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
   }

  ngOnInit(): void {
   
  }

  traitchange(e:any){
    this.traiid=e.item.id;
   
    this.listpatientfilitred();
   }
  
   traitdelete(e:any){
    this.traiid="Tous";
    this.listpatientfilitred();
    
   }

  selectEvent(e:any) {
 
    const url = '/profile/' + e.item.id;
    window.open(url, '_blank');


 }

 close(){
  // this.auto.close();
}

clear(): void {
    
  this.auto.clear();
  
 
}  

customFilter2 = function(data2: any[], query2: string): any[] {
  return data2.filter(x => x.name && x.name.toLowerCase().includes(query2.toLowerCase()));
};

onChangeSearch(val: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e:any){
    
}



  tempaddpatien(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddpatient.reset();
    this.buttondisable=false;
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

addpatient(){
  if(this.formAddpatient.valid){
    this.buttondisable=true;
    const currentDate: Date = new Date();
    this.Newpatient={
      pnom:this.formAddpatient.get('Nom')?.value,
      ptel:this.formAddpatient.get('TL')?.value,
      pnai:this.formAddpatient.get('DN')?.value,
      pgnr:this.formAddpatient.get('GNR')?.value,
      padrss:this.formAddpatient.get('ADRS')?.value,
      pdaj:currentDate,
      pst:'encours',
      pimg:'0.png'
    }
  if((this.Newpatient.ptel).toString().length !== 8) { 
    alert("le numéro de téléphone doit être de 8 chiffres");
    this.buttondisable=false;
    return;
   }
    this.apiservice.addpatient(this.Newpatient)
    .subscribe(
      (data) => {
        this.buttondisable=false;
        let id=data.pid;
        this.router.navigate(['/profile/'+id]);
        this.modalRef.hide();
      },
      error => {
        this.buttondisable=false;
        alert("réessayer");
    
       
      }); 

    
  }

}

async listpatient() {
  this.inchargement = true;
  this.datapatient=[];
  try {
      const data = await new Promise((resolve, reject) => {
          this.apiservice.listpatient().subscribe(
              (data) => {
                  resolve(data);
                
              },
              (error) => {
                  console.error(error);
                  reject(error);
              }
          );
      });
      this.inchargement = false;
      this.listpatients = data;
      this.listpatients.sort((a: { pdaj: string; pid: number }, b: { pdaj: string; pid: number }) => {
        const dateA = new Date(a.pdaj).getTime();
        const dateB = new Date(b.pdaj).getTime();
    
        // Comparaison par `pdaj` du plus récent au plus ancien
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
    
        // Si `pdaj` est le même, comparaison par `pid`
        return a.pid - b.pid;
    });
    
      for (var i = 0; i < this.listpatients.length; i++) {
        this.datapatient.push({ id: this.listpatients[i].pid, name: this.listpatients[i].pnom});
      }
     
      this.listpatientfilitred();
   
  } catch (error) {
      console.error(error);
    
  }
}
listpatientfilitred() {
  this.pages = 1;

  if (this.stpatient == 'encours') {
      if (this.traiid == 'Tous') {
          this.listpatientFiltree = this.listpatients.filter((patient: { pst: string }) => 
              patient.pst == 'encours'
          );
      } else {
          this.listpatientFiltree = this.listpatients.filter((patient: { pst: string, details: string[] | null }) => 
              patient.pst == 'encours' && 
              patient.details !== null && 
              patient.details.some(detail => detail.startsWith(this.traiid + ','))
          );
      }
  } else {
      if (this.traiid == 'Tous') {
          this.listpatientFiltree = this.listpatients.filter((patient: { pst: string }) => 
              patient.pst != null
          );
      } else {
          this.listpatientFiltree = this.listpatients.filter((patient: { pst: string, details: string[] | null }) => 
              patient.pst != null && 
              patient.details !== null && 
              patient.details.some(detail => detail.startsWith(this.traiid + ','))
          );
      }
  }
}


stchanged(e:any){
  this.stpatient=e;
 
  this.listpatientfilitred();
}

profilepage(id:any){
  const url = '/profile/' + id;
  window.open(url, '_blank');
}

search(){
  
  this.apiservice.patientstel(this.tel)
  .subscribe(
    (data) => {
     this.tel='';
      let id=data.pid;
      const url = '/profile/' + id;
      window.open(url, '_blank');
     
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

exporttoexcel(){
  const wb = XLSX.utils.book_new();
const wsName = 'Patients';
const wsData = [];

// En-têtes de colonne
const headers = ['Nom /Prénom', 'Telephone', 'Genre', 'Date Naissance','Adresse','Date D Ajout'];
wsData.push(headers);

// Remplissage des données pnai pdaj
this.listpatientFiltree.forEach((pat:any) => {
let pnai :any=this.datepipe.transform(  pat?.pnai, 'dd-MM-yyyy');
let pdaj :any=this.datepipe.transform(  pat?.pdaj, 'dd-MM-yyyy');
  const row = [
    pat?.pnom,
    pat?.ptel,
    pat?.pgnr,
    pnai,
    pat?.padrss,
    pdaj
      
  ];
  wsData.push(row);
});

// Création d'une feuille de calcul
const ws = XLSX.utils.aoa_to_sheet(wsData);
ws['!cols'] = [
{ width: 30 }, { width: 12 }, { width: 12 }, { width: 20 },{ width: 30 },{ width: 20 }
];
XLSX.utils.book_append_sheet(wb, ws, wsName);

// Écriture des données dans un fichier Excel
const fileName = 'listpatients.xlsx';
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

listrait(){
 
  this.apiservice.Traitement().subscribe(
    (data) => {
      this.listtrait  = data.map((trai: { tid: any; tnm: any; }) => {
        return { id: trai.tid, name: trai.tnm };
    });
     
    },
    error => {
      console.error(error);
    });
}
}
