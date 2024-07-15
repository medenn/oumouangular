import { Component, OnInit, TemplateRef } from '@angular/core';
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
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe ) { }

  ngOnInit(): void {
    this.listpatient();
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
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

        // Validate that all variables exist
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show');
                // change icon
                toggle.classList.toggle('bx-x');
                // add padding to body
                bodypd.classList.toggle('body-pd');
                // add padding to header
                headerpd.classList.toggle('body-pd');
            });
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
  
  try {
      const data = await new Promise((resolve, reject) => {
          this.apiservice.patients().subscribe(
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
      this.listpatientfilitred();
   
  } catch (error) {
      console.error(error);
      this.inchargement = false;
  }
}

listpatientfilitred(){
if(this.stpatient=='encours'){
  this.listpatientFiltree = this.listpatients.filter((patient: { pst: String  }) => 
    (patient.pst=='encours')
);
}else{
this.listpatientFiltree =  this.listpatientFiltree = this.listpatients.filter((patient: { pst: String  }) => 
(patient.pst!=null)
);}
}

stchanged(e:any){
  this.stpatient=e;
  console.log(e)
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
      this.router.navigate(['/profile/'+id]);
     
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


}
