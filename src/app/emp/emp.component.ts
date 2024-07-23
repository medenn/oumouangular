import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  charg= "*/../assets/charg.gif";
  modalRef: any;
  formAddemployes = new FormGroup({
    Nom: new FormControl('', Validators.required ),
    DENT: new FormControl('', Validators.required),
   FN: new FormControl('', Validators.required ),
    TL: new FormControl('', Validators.required ),
   SAL: new FormControl('', Validators.required ),
   
  });
  formimg = new FormGroup({
    IMG: new FormControl('', Validators.required ),  
   });
   formprime = new FormGroup({
    PD: new FormControl('', Validators.required ),
    PR: new FormControl('', Validators.required ),
    PM: new FormControl('', Validators.required )
    
   });
   formabs = new FormGroup({
    AD: new FormControl('', Validators.required ),
     AN: new FormControl(''),
     ANJ: new FormControl('', Validators.required ),
    AT: new FormControl('', Validators.required ),
    CCHECK: new FormControl('')
    
   });

   formEmp = new FormGroup({
    ED: new FormControl('', Validators.required ),
    EM: new FormControl('', Validators.required ),
    EJ: new FormControl(''),
    ENM: new FormControl('', [Validators.required,Validators.min(1)]),
    ETYPE:new FormControl(''),
    ECHECK:new FormControl(''),
    CRCHECK:new FormControl(''),
   });
   buttondisable=false;
   file:any;
   infosemp:any;
   imgurl:any;
   empst:any;
   empid:any;
   Newemployes:any;
   randomNumber:any;
   foncts:any=[];
   Primes:any=[];
   primeid:any;
   NewPrime:any=[];
   Absences:any=[];
   absenceid:any;
   NewAbsence:any=[];
   pages=1;
   note:any;
   Avances:any=[];
   avanceid:any;
   NewAvance:any=[];
   date:any=this.datepipe.transform(Date(), 'yyyy-MM');
   Avancefilter:any=[];
   pagesavss=1;
   bulletin:any;
   inchargementbull:any;
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe) { 
    this.empid=this.route.snapshot.paramMap.get('id');
  
    this.empinfo();
    this.listfoncts();
    this.listAbsence();
  }

  ngOnInit(): void {
  }
  showTab(tabId: string,origin :Boolean): void {
    // Get all tab panels
    if(origin==true){
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

    if(tabId=='absences'){
     
   this.listAbsence();
    }
    else if(tabId=='primes'){
      this.listPrimes();
      
    }
    else if(tabId=='avss'){
      this.listAvance();
      
    }
    
  }
}
  tempmodifierpatien(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })

    );
    this.formAddemployes.reset();
    this.buttondisable=false;
   
    this.formAddemployes.get('Nom')?.setValue(this.infosemp?.enom);
    let edent =this.datepipe.transform(this.infosemp?.edent, 'yyyy-MM-dd');
    this.formAddemployes.get('DENT')?.setValue(edent);
    this.formAddemployes.get('FN')?.setValue(this.infosemp?.efn);
    this.formAddemployes.get('TL')?.setValue(this.infosemp?.etel);
    this.formAddemployes.get('SAL')?.setValue(this.infosemp?.esal);
   
}
  tempmodifierimg(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.file=null;
    this.buttondisable=false;
    this.formimg.reset();
  
  }
  tempajouterabs(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    this.formabs.reset();
    this.formabs.get('CCHECK')?.setValue(JSON.parse("false") );
      

  }
  tempmodabs(template: TemplateRef<any>,id:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formabs.reset();
    this.absenceid=id;
    this.getabsenceinfo(id);
    }
  tempajouterprim(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg' })
      );
      this.formprime.reset();
      
    }
  tempmodprim(template: TemplateRef<any>,id:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formprime.reset();
    this.primeid=id;
    this.getprimeinfo(id);
    
  }

  tempajouteravss(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formEmp.reset();
    this.formEmp.get('ENM')?.enable();
    this.formEmp.get('CRCHECK')?.enable();
  }
tempmodavss(template: TemplateRef<any>,id:any) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );
  this.formEmp.reset();
  this.avanceid=id;
  this.getAvanceinfo(id);
  
}
tempdetailavss(id:any) {
  const myDialog :any= document.querySelector('#details');
  myDialog.showModal();
 this.pagesavss=1;
 this.Avancefilter=[];
 const avance = this.Avances.find((r: { aid: number }) => r.aid === id);

if (avance) {
  avance.details.forEach((detail: string) => {
    const [mois, annee] = detail.split(',');
    this.Avancefilter.push({
      ...avance,
      ad: `${mois}-01-${annee}`
    });
  });
}

  
}

tempbulletin() {
  const myDialog :any= document.querySelector('#bulletin');
  myDialog.showModal();
  this.bulletin=[];
  this.inchargementbull=true;
let annee =this.datepipe.transform(this.date, 'yyyy');
   let mois = this.datepipe.transform(this.date, 'MM');
  this.apiservice.findbulletin(this.empid,mois,annee).subscribe(
    (data) => {
    this.bulletin=data;
    this.inchargementbull=false;
},
error => {
  this.bulletin=[]
  this.inchargementbull=false;
  this.closed("#bulletin");
  setTimeout(() => {
    alert("Aucun relevé de salaire pour " + this.getMonthName(mois) + " " + annee);
  }, 500);
});

  
}
closed(id:any){
  const myDialog :any= document.querySelector(id);
  myDialog.close(); 
  
}
  tempnote(enote:any){
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
getinfobydate(e:any){
  let tabPaneActive :any= document.querySelector('.tab-pane.fade.show.active');

      let tabId = tabPaneActive.getAttribute('id');
      if(tabId=='absences'){
     
        this.listAbsence();
         }
         else if(tabId=='primes'){
           this.listPrimes();
           
         }
  
}
empinfo(){
  this.apiservice.Employesid(this.empid).subscribe(
    (data) => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      this.imgurl='assets/profiles/emps/img'+data.eid+'.png?random='+randomNumber;
      this.infosemp=data;
      this.empst=data.est;
},
error => {
  this.router.navigate(['/patient/']);
});
}
activer(st:any){
  let text = "Êtes-vous certain de passer l'employé en mode "+st;
  if (confirm(text) == true) {
    let patst:any;
    if(st=='actif'){
      patst='encours'
    }else{
       patst='inactive'
    }
  this.apiservice.modEmployest(patst,this.empid)
    .subscribe(
      (data) => {
        this.empinfo();
      
        Swal.fire({
   
          icon: 'success',
          title: "L'état de l'employé a été changé avec succès.",
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
supprimeremp(){
  let text = "Attention, êtes-vous sûr de vouloir supprimer l'employé ? ";
  if (confirm(text) == true) {
   
    
  this.apiservice.delEmployes(this.empid)
    .subscribe(
      (data) => {
       
        Swal.fire({
   
          icon: 'success',
          title: "L'employé a été supprimé avec succès .",
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
        
        if (result.isConfirmed) {
          this.router.navigate(['/employes/']); 
        } else{
          this.router.navigate(['/employes/']); 
        }
      })
      },
      error => {
        
        alert("réessayer");
    
       
      }); 
    }
    
  
}
imgupload(){
  if(this.formimg.valid){
    this.buttondisable=true;
  const formData = new FormData();
  formData.append('file', this.file);
  let imgname="img"+this.empid;
  this.apiservice.uploadFileEmp(formData,imgname).subscribe(async res => {  

   // let imgdiv :any = document.getElementById('imgp');
   const randomNumber = Math.floor(Math.random() * 100) + 1;
   this.imgurl='assets/profiles/emps/img'+this.empid+'.png?random='+randomNumber;
   this.modalRef.hide();
   this.buttondisable=false;
        Swal.fire({
   
          icon: 'success',
          title: "La photo de l'employé a été remplacée avec succès .",
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
    
        if (result.isConfirmed) {
          
        } 
      })
  },
  (err) =>{  this.buttondisable=false; alert('Uploaded failed.'); });
} } 

onFileChange(event: any) {
  
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
   
  this.file=file;
  
  }
}
modemp(){
  
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
    this.apiservice.modEmployes(this.Newemployes,this.empid)
    .subscribe(
      (data) => {
        this.empinfo();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'modifiés avec succès.',
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

 
listPrimes(){
  
  this.pages=1;
  // let annee =this.datepipe.transform(this.date, 'yyyy');
  // let mois = this.datepipe.transform(this.date, 'MM');
  this.apiservice.PrimesByPIDE(this.empid).subscribe(
    (data) => {
      
      if(data!=null){
      this.Primes=data;
      
     
    }else{
      this.Primes=[];
    }
    },
    error => {
      console.error(error);
    });
}
addprime(){

  if(this.formprime.valid){
    this.buttondisable=true;
  
  //Annulé Confirmé
    this.NewPrime={
    "pd":this.formprime.get('PD')?.value,
    "pide":this.empid,
    "pr":this.formprime.get('PR')?.value,
    "pm":this.formprime.get('PM')?.value
      
    }
    this.apiservice.addPrimes( this.NewPrime)
    .subscribe(
      (data) => {
        this.listPrimes();
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

getprimeinfo(id:any){
  let data=this.Primes.find((item: { pid: number; }) => item.pid === id)
    
  let convrtdate =this.datepipe.transform(data.pd, 'yyyy-MM-dd');
  this.formprime.get('PD')?.setValue(convrtdate);
  this.formprime.get('PR')?.setValue(data.pr);
  this.formprime.get('PM')?.setValue(data.pm);
 

}

modprime(){
  if(this.formprime.valid){
    this.buttondisable=true;
    const currentDate: Date = new Date();
    this.NewPrime={
    "pd":this.formprime.get('PD')?.value,
    "pr":this.formprime.get('PR')?.value,
    "pm":this.formprime.get('PM')?.value
      
      
    }
  
    this.apiservice.updatePrimes(this.primeid,this.NewPrime)
    .subscribe(
      (data) => {
        this.listPrimes();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'modifiés avec succès.',
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
delprimes(id:any){
  let text = "Attention, voulez-vous vraiment supprimer cette prime ? ";
  if (confirm(text) == true) {
   
    
  this.apiservice.deletePrimes(id)
    .subscribe(
      (data) => {
       this.listPrimes();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression de la prime a été effectuée avec succès.",
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

listAbsence(){
  this.pages=1;
  // let annee =this.datepipe.transform(this.date, 'yyyy');
  // let mois = this.datepipe.transform(this.date, 'MM');
  
  this.apiservice.AbsencesByAIDE(this.empid).subscribe(
    (data) => {
     
      if(data!=null){
      this.Absences=data;
      
     
    }else{
      this.Absences=[];
    }
    },
    error => {
      console.error(error);
    });
}
addabsence(){
  
  if(this.formabs.valid){
    this.buttondisable=true;
  //Annulé Confirmé
    this.NewAbsence={
    "ad":this.formabs.get('AD')?.value,
      "aide":this.empid,
      "anj":this.formabs.get('ANJ')?.value,
      "ant":this.formabs.get('AN')?.value,
      "at":this.formabs.get('AT')?.value,
      "ccheck":this.formabs.get('CCHECK')?.value
      
    }

    this.apiservice.addAbsences( this.NewAbsence)
    .subscribe(
      (data) => {
        this.listAbsence();
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

getabsenceinfo(id:any){
  let data=this.Absences.find((item: { aid: number; }) => item.aid === id)
    
  let convrtdate =this.datepipe.transform(data.ad, 'yyyy-MM-dd');
  this.formabs.get('AD')?.setValue(convrtdate);
  this.formabs.get('AN')?.setValue(data.ant);
  this.formabs.get('ANJ')?.setValue(data.anj);
  this.formabs.get('AT')?.setValue(data.at);
  this.formabs.get('CCHECK')?.setValue(JSON.parse(data.ccheck) );
 

}

modabsence(){
  if(this.formabs.valid){
    this.buttondisable=true;
    const currentDate: Date = new Date();
    this.NewAbsence={
      "ad":this.formabs.get('AD')?.value,
        "anj":this.formabs.get('ANJ')?.value,
        "ant":this.formabs.get('AN')?.value,
        "at":this.formabs.get('AT')?.value,
        "ccheck":this.formabs.get('CCHECK')?.value
        
      }
  
  
    this.apiservice.updateAbsences(this.absenceid,this.NewAbsence)
    .subscribe(
      (data) => {
        this.listAbsence();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'modifiés avec succès.',
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
delabsence(id:any){
  let text = "Attention, voulez-vous vraiment supprimer cette absence ? ";
  if (confirm(text) == true) {
   
    
  this.apiservice.deleteAbsences(id)
    .subscribe(
      (data) => {
       this.listAbsence();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression de l'absence a été effectuée avec succès.",
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
getMonthName(index: any): string {
  const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Vérifie que l'index est valide (entre 1 et 12)
 
      return months[index - 1]; // -1 car les index de tableau commencent à 0

}

listAvance(){
  this.pages=1;
  // let annee =this.datepipe.transform(this.date, 'yyyy');
  // let mois = this.datepipe.transform(this.date, 'MM');
  
  this.apiservice.AvanceByAIDE(this.empid).subscribe(
    (data) => {
     
      if(data!=null){
      
        this.Avances=data;
          this.Avances.forEach((avance: { dmois:any,details: any; }) => {
            // Récupérer les détails de chaque élément
            var details = avance.details;
        
            // Récupérer le dernier élément du tableau
            var dernierElement = details[details.length - 1];
        
            // Séparer le mois et l'année
            var [mois, annee] = dernierElement.split(',');
        
            // Formater la date comme "01-06-2024"
            avance.dmois= mois.padStart(2, '0') + "-01-" + annee;
            avance.dmois=this.datepipe.transform( avance.dmois, 'MM-dd-yyyy');
        
            
        });
  
         
     
         
         // Parcourir chaque élément de this.Avances

        
        

         
          
        }else{
          this.Avances=[];
         
        
        }
        },
        error => {
          console.error(error);
        });
}
addavance(){
  
  if(this.formEmp.valid){
    this.buttondisable=true;
    let edValue = this.formEmp.get('ED')?.value;
    let modifiedDate = `${edValue}-01`;
    const am = this.formEmp.get('EM')?.value;
    const anm = this.formEmp.get('ENM')?.value;
    const check = this.formEmp.get('ECHECK')?.value;

// Initialiser le tableau dateav
const dateav: { mois: string, annee: string }[] = [];
  const startDate = new Date(edValue);

if(check==1){
  dateav.push({
    mois: ('0' + (startDate.getMonth() + 1)).slice(-2),
    annee: startDate.getFullYear().toString()
  });
}
else{
  for (let i = 0; i < anm; i++) {
    // Ajouter un mois à la date actuelle

    startDate.setMonth(startDate.getMonth() + 1);

    // Obtenir le mois et l'année de la nouvelle date
    const mois = ('0' + (startDate.getMonth() + 1)).slice(-2); // pour obtenir le format '01' à '09'
    const annee = startDate.getFullYear().toString();

    // Ajouter les valeurs à dateav
    dateav.push({ mois, annee });
  }
}

const detailsarray: string[] = Array.from(dateav, ({ mois, annee }) => `${mois},${annee}`);

this.NewAvance={
  ad:  modifiedDate,
  aide: this.empid,
  aj: this.formEmp.get('EJ')?.value,
  am: am,
  amp: am / anm,
  anm: anm,
  details:detailsarray,
  at: this.formEmp.get('ETYPE')?.value,
  crcheck:this.formEmp.get('CRCHECK')?.value,
};
    this.apiservice.addAvance( this.NewAvance)
    .subscribe(
      (data) => {
        this.listAvance();
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

getAvanceinfo(id:any){
  let data=this.Avances.find((item: { aid: number; }) => item.aid === id)

  let convrtdate =this.datepipe.transform(data.ad, 'yyyy-MM');
  this.formEmp.get('ED')?.setValue(convrtdate);
  this.formEmp.get('ETYPE')?.setValue( data.at);
  this.formEmp.get('EM')?.setValue( data.am);

  this.formEmp.get('EJ')?.setValue(data.aj);
  
  this.changeatype();
  this.formEmp.get('CRCHECK')?.setValue(  JSON.parse(data.crcheck));
  this.formEmp.get('ENM')?.setValue( data.anm);
 

}

modAvance(){
  if(this.formEmp.valid){
    this.buttondisable=true;
    let edValue = this.formEmp.get('ED')?.value;
    let modifiedDate = `${edValue}-01`;
    const am = this.formEmp.get('EM')?.value;
    const anm = this.formEmp.get('ENM')?.value;
    const check = this.formEmp.get('ECHECK')?.value;

// Initialiser le tableau dateav
const dateav: { mois: string, annee: string }[] = [];
  const startDate = new Date(edValue);

if(check==1){
  dateav.push({
    mois: ('0' + (startDate.getMonth() + 1)).slice(-2),
    annee: startDate.getFullYear().toString()
  });
}
else{
  for (let i = 0; i < anm; i++) {
    // Ajouter un mois à la date actuelle

    startDate.setMonth(startDate.getMonth() + 1);

    // Obtenir le mois et l'année de la nouvelle date
    const mois = ('0' + (startDate.getMonth() + 1)).slice(-2); // pour obtenir le format '01' à '09'
    const annee = startDate.getFullYear().toString();

    // Ajouter les valeurs à dateav
    dateav.push({ mois, annee });
  }
}

const detailsarray: string[] = Array.from(dateav, ({ mois, annee }) => `${mois},${annee}`);

this.NewAvance={
  ad:  modifiedDate,
  aide: this.empid,
  aj: this.formEmp.get('EJ')?.value,
  am: am,
  amp: am / anm,
  anm: anm,
  details:detailsarray,
  at: this.formEmp.get('ETYPE')?.value,
  crcheck:this.formEmp.get('CRCHECK')?.value,
};
  
    this.apiservice.updateAvance(this.avanceid,this.NewAvance)
    .subscribe(
      (data) => {
        this.listAvance();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'modifiés avec succès.',
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
delavance(id:any){
  let text = "Attention, êtes-vous sûr de vouloir supprimer ?";
  if (confirm(text) == true) {
   
    
  this.apiservice.deleteAvance(id)
    .subscribe(
      (data) => {
       this.listAvance();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression a été effectuée avec succès.",
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

 
changeatype(){
  let type=this.formEmp.get('ETYPE')?.value
  
  if(type=='Prêt'){
    this.formEmp.get('CRCHECK')?.setValue(true);
this.formEmp.get('ECHECK')?.setValue(false)
this.formEmp.get('ENM')?.setValue(null);
this.formEmp.get('ENM')?.enable();
this.formEmp.get('CRCHECK')?.enable();
    }else if(type=='Avance'){
      this.formEmp.get('CRCHECK')?.setValue(false)
this.formEmp.get('ECHECK')?.setValue(true)
this.formEmp.get('ENM')?.setValue(1);
this.formEmp.get('ENM')?.disable();
this.formEmp.get('CRCHECK')?.disable();
}
}

deletsousemp(idavance:any,details:any,ad:any){
  let annee1 =this.datepipe.transform(ad, 'yyyy');
  let mois1 = this.datepipe.transform(ad, 'MM');
  let text = "Confirmez-vous votre choix d'annuler le montant déductible prévu pour ce mois "+mois1+'-'+annee1;
  if (confirm(text) == true) {
  
  let moisav = `${mois1},${annee1}`;
let dernierItem: string = details[details.length - 1];
let [mois, annee] = dernierItem.split(',');
let moisSuivant = (parseInt(mois) + 1).toString().padStart(2, '0');
let anneeSuivante = annee;
if (moisSuivant === '13') {
  moisSuivant = '01';
  anneeSuivante = (parseInt(annee) + 1).toString();
}
let lastav = `${moisSuivant},${anneeSuivante}`;

// Recherchez moisav dans details et supprimez-le
let indexMoisAv = details.indexOf(moisav);
if (indexMoisAv !== -1) {
  details.splice(indexMoisAv, 1);
}
details.push(lastav);

const detailsarray: string[] = details.map((item: any) => item);
const newAvance={
details:detailsarray,
};   


this.apiservice.updateAvancedetail(idavance ,newAvance)
.subscribe(
response => {

 this.listAvance();
// this.getavancesoustr();
 Swal.fire({

  icon: 'success',
  title: "L'opération D'annulation a été réalisée avec succès.",
showCancelButton: false,
confirmButtonText: 'OK',
//cancelButtonText: 'No, keep it',
})

},
error => {
  console.log('error')
});

} else {

}

  
  // 
 

}
}
