import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-compta',
  templateUrl: './compta.component.html',
  styleUrls: ['./compta.component.css']
})
export class ComptaComponent implements OnInit {
  charg= "*/../assets/charg.gif";
  excel= "*/../assets/excel.png";
  modalRef: any;
  formAddpaie= new FormGroup({
    DT: new FormControl('', Validators.required ),
 MODE: new FormControl('', Validators.required),
 DESC: new FormControl('', Validators.required),
   MNT: new FormControl('', Validators.required ),
   NOTE: new FormControl('' ),
    

  });
  buttondisable=false;
  modepaie:any=[];
  paiements:any=[];
  Newpaie:any=[];
  paiementid:any;
  pages=1;
  randomNumber:any;
  typepaiement:any='in';
  stardate:any;
  enddate:any;
inchargement:any;
paiementfiltrer:any=[];
modeselected='Tous';
seances:any=[];
traits:any=[];

  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe) {
    this.randomNumber = Math.floor(Math.random() * 100) + 1;

  
    const currentDate = new Date();
    this.stardate = this.datepipe.transform(  currentDate, 'yyyy-MM-dd');
    this.enddate=null;
    this.listrait();
    this.getlisetseances();
    this.listmodepaiement();
    
   }

  ngOnInit(): void {
  }

  tempaddpaie(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddpaie.reset();
    this.buttondisable=false;
  }

  tempmodpaie(template: TemplateRef<any>,id:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddpaie.reset();
    this.buttondisable=false;
    this.paiementid=id;
    this.getpaieinfo(id);
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

showTab(tabId: string): void {
  // Get all tab panels
  const tabPanels = document.querySelectorAll('.tab-pane');
  
  // Iterate over each tab panel
  tabPanels.forEach((panel) => {
      if (panel.id === tabId) {
          panel.classList.add('show', 'active');
      } else {
          panel.classList.remove('show', 'active');
      }
  });

  const links = document.querySelectorAll('.nav-link'); // Sélectionnez tous les liens de navigation
  links.forEach(link => {
    link.classList.remove('active'); // Supprimez la classe active de tous les liens
  });

  const tabLink = document.getElementById(tabId); // Sélectionnez l'élément avec l'ID spécifié
  if (tabLink) {
    tabLink.classList.add('active'); // Ajoutez la classe active à l'élément avec l'ID spécifié
  }
  if(tabId=='seances'){
    const currentDate = new Date();
    this.stardate = this.datepipe.transform(  currentDate, 'yyyy-MM-dd');
    this.enddate=null;
    this.getlisetseances();
  }else if(tabId=='paiements'){
    const currentDate = new Date();
    // Obtenez le début du mois actuel
    this.stardate = this.datepipe.transform(  currentDate, 'yyyy-MM-dd');
    this.enddate=null;
    this.modeselected='Tous';
    this.typepaiement='in';
    this.getlisetpaiements();

  }
}
listmodepaiement(){
  this.apiservice.Modepaiement().subscribe(
    (data) => {
      
      if(data!=null){
      this.modepaie=data;
      
     
    }else{
      this.modepaie=[];
    }
    },
    error => {
      console.error(error);
    });
}


addpaie(){
  if(this.formAddpaie.valid){
    this.buttondisable=true;
    
   
    this.Newpaie={
      pdate:this.formAddpaie.get('DT')?.value,
      pdesc:this.formAddpaie.get('DESC')?.value,
      pmode:this.formAddpaie.get('MODE')?.value,
      pmnt:this.formAddpaie.get('MNT')?.value,
      ptype:'out',
      pnote: this.formAddpaie.get('NOTE')?.value,
      ppid:0
      
    }

    this.apiservice.addPaiement( this.Newpaie)
    .subscribe(
      (data) => {
        this.listpaiementrefrech();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'Ajouté avec succès.',
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
    
        if (result.isConfirmed) {
          
        } 
      })
      },
      error => {
        this.buttondisable=false;
        alert("réessayer");
    
       
      }); 
    }
}
getpaieinfo(id:any){
  let data= this.paiements.find((item: { pid: number; }) => item.pid === id)
 
  let pdate=this.datepipe.transform(data.pdate, 'yyyy-MM-dd');
 this.formAddpaie.get('DT')?.setValue(pdate);
 this.formAddpaie.get('MODE')?.setValue(data.pmode);
 this.formAddpaie.get('MNT')?.setValue(data.pmnt);
 this.formAddpaie.get('NOTE')?.setValue(data.pnote);
 this.formAddpaie.get('DESC')?.setValue(data.pdesc);

  
}
modpaie(){
  if(this.formAddpaie.valid){
    this.buttondisable=true;
    
   
    this.Newpaie={
      pdesc:this.formAddpaie.get('DESC')?.value,
      pdate:this.formAddpaie.get('DT')?.value,
      pmode:this.formAddpaie.get('MODE')?.value,
      pmnt:this.formAddpaie.get('MNT')?.value,
      pnote: this.formAddpaie.get('NOTE')?.value,
     
    }

    this.apiservice.updatePaiement(this.paiementid, this.Newpaie)
    .subscribe(
      (data) => {
        this.listpaiementrefrech();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'Ajouté avec succès.',
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
    
        if (result.isConfirmed) {
          
        } 
      })
      },
      error => {
        this.buttondisable=false;
        alert("réessayer");
    
       
      }); 
    }
}

delpaie(id:any){
  let text = "Attention, Êtes-vous sûr(e) de vouloir supprimer ce paiement  ? ";
  if (confirm(text) == true) {
   
    
  this.apiservice.deletePaiement(id)
    .subscribe(
      (data) => {
        this.listpaiementrefrech();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression du paiement a été effectuée avec succès.",
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
        
       
      })
      },
      error => {
        
        alert("réessayer");
    
       
      }); 
    }

}
getmodeById(id: number) {
  let a:any=this.modepaie.find((item: { mpid: number; }) => item.mpid === id);
  return a?.mpnm;
 }
 
 getMonthName(index: any): string {
  const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Vérifie que l'index est valide (entre 1 et 12)
 
      return months[index - 1]; // -1 car les index de tableau commencent à 0

}

getlastpaiements(){
  this.inchargement=true;
  let e:any;
  this.apiservice.Paiement().subscribe(
    (data) => {
    
      this.inchargement=false;
      if(data!=null){
        this.paiements=data;
      this.filtreretat(e);
   
     
     
    }else{
      this.paiements=[];
      this.filtreretat(e);
   
    }
    },
    error => {
      this.paiements=[];
      this.filtreretat(e);
   
      console.error(error);
    });
}
getlisetpaiements(){
  this.inchargement=true;
  let e:any;
  this.apiservice.getPaiementbydate(this.stardate).subscribe(
    (data) => {
    
      this.inchargement=false;
      if(data!=null){
        this.paiements=data;
      this.filtreretat(e);
   
     
     
    }else{
      this.paiements=[];
      this.filtreretat(e);
   
    }
    },
    error => {
      this.paiements=[];
      this.filtreretat(e);
   
      console.error(error);
    });
}

getlisetpaiementbetweendate(){
  this.inchargement=true;
  let e:any;
  this.apiservice.getPaiementtwodate(this.stardate,this.enddate).subscribe(
    (data) => {
      this.inchargement=false;
      if(data!=null){
        this.paiements=data;
      this.filtreretat(e);
   
     
    }else{
      this.paiements=[];
      this.filtreretat(e);
    }
    },
    error => {
      this.paiements=[];
      this.filtreretat(e);
      console.error(error);
    });
}

filtreretat(e:any){
  if(this.modeselected=='Tous'){
    this.paiementfiltrer = this.paiements.filter((paie: { ptype: String  }) => 
      (paie.ptype==this.typepaiement)
  );
  }else{
    this.paiementfiltrer = this.paiements.filter((paie: { ptype: String ,pmode:String }) => 
      (paie.ptype==this.typepaiement&&paie.pmode==this.modeselected)
  );
  }
}

changetype(type:any){
  this.typepaiement=type;
  let e:any;
  this.filtreretat(e);
}
chercher(){
  const start = new Date(this.stardate);
  const end = new Date(this.enddate);
  if (!this.stardate ) {
    alert('La date que vous avez entrée est invalide. Veuillez vérifier et réessayer.');
    return;
  }
  else if(this.stardate && !this.enddate){
    this.getlisetpaiements();

  }
  else if(this.stardate && this.enddate){
    this.getlisetpaiementbetweendate();
    if (start > end) {
      alert('La date de fin ne peut pas être antérieure à la date de début.');
      return;
    }else{

    }

  }

  

  

}

listpaiementrefrech(){
this.stardate=null;
this.enddate=null;
this.modeselected='Tous';
this.getlastpaiements();
}


getlastseances(){
  this.inchargement=true;
  let e:any;
  this.apiservice.Seancess().subscribe(
    (data) => {
    
      this.inchargement=false;
      if(data!=null){
        this.seances=data;
          
    }else{
      this.seances=[];
    }
    },
    error => {
      this.seances=[];
   
      console.error(error);
    });
}
getlisetseances(){
  this.inchargement=true;
  let e:any;
  this.apiservice.getSeancesbydate(this.stardate).subscribe(
    (data) => {
    
      this.inchargement=false;
      if(data!=null){
        this.seances=data;
    
    }else{
      this.seances=[];

    }
    },
    error => {
      this.seances=[];
   
      console.error(error);
    });
}

getlisetseancebetweendate(){
  this.inchargement=true;
  let e:any;
  this.apiservice.getPaiementtwodate(this.stardate,this.enddate).subscribe(
    (data) => {
      this.inchargement=false;
      if(data!=null){
        this.seances=data;
    }else{
      this.seances=[];
    }
    },
    error => {
      this.seances=[];
      console.error(error);
    });
}

chercherseances(){
  const start = new Date(this.stardate);
  const end = new Date(this.enddate);
  if (!this.stardate ) {
    alert('La date que vous avez entrée est invalide. Veuillez vérifier et réessayer.');
    return;
  }
  else if(this.stardate && !this.enddate){
    this.getlisetseances();

  }
  else if(this.stardate && this.enddate){
    this.getlisetseancebetweendate();
    if (start > end) {
      alert('La date de fin ne peut pas être antérieure à la date de début.');
      return;
    }else{

    }

  }

  

  

}

listrait(){
  this.pages=1;
  this.apiservice.Traitement().subscribe(
    (data) => {
      
      if(data!=null){
      this.traits=data;
      
     
    }else{
      this.traits=[];
    }
    },
    error => {
      console.error(error);
    });
}
gettraitById(id: any) {
  
  let a:any=this.traits.find((item: { tid: number; }) => item.tid == id);
  return a?.tnm;
 }
}
