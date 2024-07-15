import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  modalRef: any;
  formAddTrait= new FormGroup({
    NMT: new FormControl('', Validators.required ),
    TA: new FormControl('', Validators.required ),
  
  });
  formAddAssur= new FormGroup({
    NMA: new FormControl('', Validators.required ),
    TA: new FormControl('', Validators.required ),
    PA: new FormControl('', Validators.required ),
  
  });
  formAddFn= new FormGroup({
    FNM: new FormControl('', Validators.required )
  
  });
  buttondisable=false;
  traits:any=[];
  traitid:any;
  Newtrai:any=[];
  assurs:any=[]
  assurid:any;
  Newassur:any=[];
  foncts:any=[];
  fonctid:any;
  Newfonct:any=[];
  pages=0;
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.listrait();
  }

  tempaddTrai(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddTrait.reset();
  this.buttondisable=false;
  }

  tempmodTrai(template: TemplateRef<any>,id:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddTrait.reset();
    this.buttondisable=false;
    this.traitid=id;
    this.gettraitinfo(id);
  }

  tempaddAssur(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddAssur.reset();
  this.buttondisable=false;
  }

  tempmodModAssur(template: TemplateRef<any>,id:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddAssur.reset();
    this.buttondisable=false;
    this.assurid=id;
    this.getassurinfo(id);
  }
  tempaddfnct(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddFn.reset();
    this.buttondisable=false;
  }
  tempmodfnct(template: TemplateRef<any>,id:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddFn.reset();
    this.buttondisable=false;
    this.fonctid=id;
    this.getfnctinfo(id);
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
    if(tabId=='traitements'){
      this.listrait();

    }
    else if(tabId=='assurances'){
      this.listassurance();
    }
    else if(tabId=='fonctions'){
      this.listfoncts();
    }
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
addtrait(){
  if(this.formAddTrait.valid){
    this.buttondisable=true;
 
    this.Newtrai={
      tnm:this.formAddTrait.get('NMT')?.value,
      tmnt:this.formAddTrait.get('TA')?.value,  
    }

    this.apiservice.addTraitement( this.Newtrai)
    .subscribe(
      (data) => {
        this.listrait();
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
gettraitinfo(id:any){
  let data=this.traits.find((item: { tid: number; }) => item.tid === id)
    
  this.formAddTrait.get('NMT')?.setValue(data.tnm);
  this.formAddTrait.get('TA')?.setValue(data.tmnt);
}
modtrait(){
  if(this.formAddTrait.valid){
    this.buttondisable=true;
 
    this.Newtrai={
      tnm:this.formAddTrait.get('NMT')?.value,
      tmnt:this.formAddTrait.get('TA')?.value,  
    }

    this.apiservice.updateTraitement(this.traitid,this.Newtrai)
    .subscribe(
      (data) => {
        this.listrait();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'modifiés avec succès .',
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
listassurance(){
  this.pages=1;
  this.apiservice.Assurance().subscribe(
    (data) => {
      
      if(data!=null){
      this.assurs=data;
      
     
    }else{
      this.assurs=[];
    }
    },
    error => {
      console.error(error);
    });
}
addAssur(){
  if(this.formAddAssur.valid){
    this.buttondisable=true;
   
    this.Newassur={
      asnm:this.formAddAssur.get('NMA')?.value,
      asmnt:this.formAddAssur.get('TA')?.value,  
      aspr:this.formAddAssur.get('PA')?.value
    }

    this.apiservice.addAssurance( this.Newassur)
    .subscribe(
      (data) => {
        this.listassurance();
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
getassurinfo(id:any){
  let data=this.assurs.find((item: { asid: number; }) => item.asid === id)
  
  this.formAddAssur.get('NMA')?.setValue(data.asnm);
  this.formAddAssur.get('TA')?.setValue(data.asmnt);
  this.formAddAssur.get('PA')?.setValue(data.aspr);
}
modAssur(){
  if(this.formAddAssur.valid){
    this.buttondisable=true;
   
    this.Newassur={
      asnm:this.formAddAssur.get('NMA')?.value,
      asmnt:this.formAddAssur.get('TA')?.value,  
      aspr:this.formAddAssur.get('PA')?.value
    }

    this.apiservice.updateAssurance( this.assurid,this.Newassur)
    .subscribe(
      (data) => {
        this.listassurance();
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
  this.pages=1;
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
addfonct(){
  if(this.formAddFn.valid){
    this.buttondisable=true;
   
    this.Newfonct={
      fnm:this.formAddFn.get('FNM')?.value
    }

    this.apiservice.addFonction( this.Newfonct)
    .subscribe(
      (data) => {
        this.listfoncts();
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
getfnctinfo(id:any){
  let data=this.foncts.find((item: { fid: number; }) => item.fid === id)
  
  this.formAddFn.get('FNM')?.setValue(data.fnm);
  
}
modfonct(){
  if(this.formAddFn.valid){
    this.buttondisable=true;
   
    this.Newfonct={
      fnm:this.formAddFn.get('FNM')?.value
    }

    this.apiservice.updateFonction( this.fonctid,this.Newfonct)
    .subscribe(
      (data) => {
        this.listfoncts();
        this.buttondisable=false;
        this.modalRef.hide();
        Swal.fire({
   
          icon: 'success',
          title: 'modifiés avec succès .',
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


}
