import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  charg= "*/../assets/charg.gif";
  logo= "*/../assets/logo.png";
  logo2= "*/../assets/logo2.png";
  modalRef: any;
  formAddpatient = new FormGroup({
    Nom: new FormControl('', Validators.required ),
    DN: new FormControl('', Validators.required),
    GNR: new FormControl('', Validators.required ),
    TL: new FormControl('', Validators.required ),
    ADRS: new FormControl('', Validators.required ),
   
     
  });

  formAdddossier = new FormGroup({
    DT: new FormControl('', Validators.required ),
  TR: new FormControl('', Validators.required),
  RMS: new FormControl('', Validators.required),
    NOTE: new FormControl('' ),
    CHKASSUR: new FormControl('' ),
    ASSRID: new FormControl('' ),
    ASSRTAUX: new FormControl('', Validators.required ),

  });
  formAddseance = new FormGroup({
    DT: new FormControl('', Validators.required ),
    NOTE: new FormControl('' ),
    SN:new FormControl('', Validators.required )

  });
  formAddrendez= new FormGroup({
    DT: new FormControl('', Validators.required ),
  HR: new FormControl('', Validators.required),
    RM: new FormControl('' ),
    ST: new FormControl('' ),

  });
  formAddpaie= new FormGroup({
    DT: new FormControl('', Validators.required ),
  MODE: new FormControl('', Validators.required),
   MNT: new FormControl('', Validators.required ),
   NOTE: new FormControl('' )
    

  });
  formimg = new FormGroup({
    IMG: new FormControl('', Validators.required ),  
   });
   formdoc = new FormGroup({
    NM: new FormControl('', Validators.required ),  
    FL: new FormControl('', Validators.required ),  
   });

   formmoddoc = new FormGroup({
    NM: new FormControl('', Validators.required ),  
   });
  buttondisable=false;
  file:any;

  
  listraitinseance:any = []; 
  
  selected :any= []; 
  patid:any;
  infospat:any;
  imgurl:any;
  patst:any;
  Newpatient:any;
  Newevent:any;
  pagesfile:any=1;
  listfiles:any=[];
  oldfileName:any;
  events:any=[];
  pages=1;
  note:any='';
  rendid:any;
  modepaie:any=[];
  paiements:any=[];
  dossierid:any;
  Newpaie:any=[];
  paiementid:any;
  seances:any=[];
  Newseance:any=[];
 seancesid:any;
 traits:any=[];
 inchargement:any;
 dossiers:any;
 assurs:any;
 remise:any=0;
 assurtaux:any=0;
 Newdossier:any=[];
 dossieridmod:any;
 totalsArray:any=[];
 seancesTraitsData:any=[];
 totaldossiermnt:any=0;
 dossierinfo:any;
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe) {
this.patid=this.route.snapshot.paramMap.get('id');
    this.patientinfo();
    this.listdossiers();
    this.listrait();
    this.listassurs();
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

    if(tabId=='documents'){
      this.listdocs();

    }
    else if(tabId=='rendezvous'){
      this.listrendezvous();
      
    }
    
  }else if(origin==false){
    const tabPanels = document.querySelectorAll('.tab-pane');
const validTabIds = ['seances', 'paiements'];

// Iterate over each tab panel
tabPanels.forEach((panel) => {
    if (validTabIds.includes(panel.id)) {
        if (panel.id === tabId) {
            panel.classList.add('show', 'active');
        } else {
            panel.classList.remove('show', 'active');
        }
    }
});

const links = document.querySelectorAll('.nav-link'); // Sélectionnez tous les liens de navigation
links.forEach(link => {
    if (validTabIds.includes(link.id)) {
        link.classList.remove('active'); // Supprimez la classe active de tous les liens valides
    }
});

const tabLink = document.getElementById(tabId); 
if (tabLink && validTabIds.includes(tabId)) {
    tabLink.classList.add('active'); 
}

    if(tabId=='seances'){
   this.pages=1;
    }else if(tabId=='paiements'){
      this.selectpaiement();
    }
    }
}

  tempmodifierpatien(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })

    );
    this.formAddpatient.reset();
    this.buttondisable=false;
   
    this.formAddpatient.get('Nom')?.setValue(this.infospat?.pnom);
    let pnai =this.datepipe.transform(this.infospat?.pnai, 'yyyy-MM-dd');
    this.formAddpatient.get('DN')?.setValue(pnai);
    this.formAddpatient.get('GNR')?.setValue(this.infospat?.pgnr);
    this.formAddpatient.get('TL')?.setValue(this.infospat?.ptel);
    this.formAddpatient.get('ADRS')?.setValue(this.infospat?.padrss);
   
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

tempadddossier(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
    
  );
  this.remise=0;
  this.assurtaux=0;
  this.formAdddossier.reset();
  this.buttondisable=false;
  this.listraitinseance=[];
  this.formAdddossier.get('RMS')?.setValue(0)
  this.formAdddossier.get('ASSRID')?.setValue(0)
  this.formAdddossier.get('ASSRTAUX')?.setValue(0)

  this.traits.forEach((trait: { tid: any; tnm: any; tmnt: any; }) => {
  const nouveauTraitement: any = {
    id: trait.tid,
    name: trait.tnm,
    prix: trait.tmnt,
    nbre: '' // initialiser avec une chaîne vide
  };
  this.listraitinseance.push(nouveauTraitement);
});
  // let listtraitseances: any = t.map((item: string) => {
  //   let [id, nbre] = item.split(",").map(Number);
  //   let tname=this.gettraitById(id);
  //   return { id: id, name:tname, nbre: nbre };
  // });
  
  // this.listraitinseance.push(...listtraitseances);
  this.selected = [];
  this.formAddseance.get('TR')?.setValue(this.selected );
  
  
}

tempmoddossier(template: TemplateRef<any>,id:any) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
    
  );
  this.formAdddossier.reset();
  this.buttondisable=false;
  this.dossieridmod=id;
  this.selected=[];
  this.listraitinseance=[];
  this.traits.forEach((trait: { tid: any; tnm: any; tmnt: any; }) => {
    const nouveauTraitement: any = {
      id: trait.tid,
      name: trait.tnm,
      prix: trait.tmnt,
      nbre: '' // initialiser avec une chaîne vide
    };
    this.listraitinseance.push(nouveauTraitement);
  });

  this.getdossierinfo(id);
  
  
}
tempaddrendez(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
    
  );
  this.formAddrendez.reset();
  this.buttondisable=false;

}

tempmodrendez(template: TemplateRef<any>,id:any) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
    
  );
  this.formAddrendez.reset();
  this.buttondisable=false;
  this.rendid=id;
  this.getrendvousinfo(id);

}
onSelectionChange(event: any) {
  
  const updatedSelected = event.map((newItem: any) => {
    const existingItem = this.selected.find((item: any) => item.id == newItem.id);
    if (existingItem) {
      // Keep the existing 'nbre' value
      return { ...newItem, nbre: existingItem.nbre };
    } else {
      // Add the new item with an empty 'nbre'
      return { ...newItem, nbre: '' };
    }
  });

  this.selected = updatedSelected;
 
}

onSelectionChange2(event: any) {
  let value=Number(this.formAdddossier.get('ASSRID')?.value);
  let prix=this.getassurprix(value)
  
  const updatedSelected = event.map((newItem: any) => {
    const existingItem = this.selected.find((item: any) => item.id == newItem.id);
    if (existingItem) {
      // Keep the existing 'nbre' value
      if(value==0){
      return { ...newItem,prix:existingItem.prix , nbre: existingItem.nbre };
    }else{
      return { ...newItem,prix:prix , nbre: existingItem.nbre };
    }
    } else {
      
      
      if(value==0){
        return { ...newItem, nbre: '' };
      }else{
        return { ...newItem,prix:prix, nbre: '' };
      }
    }
  });

  this.selected = updatedSelected;
 this.total();
}
  tempaddseance(template: TemplateRef<any>) {
    const myDialog :any= document.querySelector('#details');
    myDialog.close(); 
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
      
    );
    this.formAddseance.reset();
    this.buttondisable=false;
    this.listraitinseance=[];
    let data= this.dossiers.find((item: { did: number; }) => item.did === this.dossierid)
    let detailsdossier :any= data.details;

    let listtraitseances: any = detailsdossier.map((item: string) => {
      let [id,prix, nbre] = item.split(",").map(Number);
      let tname=this.gettraitById(id);
      return { id: id, name:tname, nbre: '' };
    });
    
    this.listraitinseance.push(...listtraitseances);
   
    this.selected = [];
    this.formAddseance.get('SN')?.setValue(this.selected );
  }

  updateNbre(index: number, value: string) {
    this.selected[index].nbre = value;
    this.total();
  }
  updateprix(index: number, value: any) {
    this.selected[index].prix = value;
    this.total();
  }
  tempmodseance(template: TemplateRef<any>,id:any) {
    const myDialog :any= document.querySelector('#details');
    myDialog.close(); 
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
      
    );
    this.formAddseance.reset();
    this.buttondisable=false;
    this.seancesid=id;
    this.selected=[];
    this.listraitinseance=[];
    let data= this.dossiers.find((item: { did: number; }) => item.did === this.dossierid)
    let detailsdossier :any= data.details;

    let listtraitseances: any = detailsdossier.map((item: string) => {
      let [id,prix, nbre] = item.split(",").map(Number);
      let tname=this.gettraitById(id);
      return { id: id, name:tname, nbre: '' };
    });
    
    this.listraitinseance.push(...listtraitseances);
    this.getseanceinfo(id);
  }

  tempaddpaie(template: TemplateRef<any>) {
    const myDialog :any= document.querySelector('#details');
    myDialog.close(); 
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddpaie.reset();
    this.buttondisable=false;
  }

  tempmodpaie(template: TemplateRef<any>,id:any) {
    const myDialog :any= document.querySelector('#details');
    myDialog.close(); 
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.formAddpaie.reset();
    this.buttondisable=false;
    this.paiementid=id;
    this.getpaieinfo(id);
  }
  
tempadddoc(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
    
  );
  this.file=null;
  this.buttondisable=false;
  this.formdoc.reset();

}

tempmoddoc(template: TemplateRef<any>,name:any) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
    
  );
  
  this.buttondisable=false;
  this.formmoddoc.reset();
  this.formmoddoc.get('NM')?.setValue(name);
  this.oldfileName=name;
}
tempdetails(id:any) {
  this.dossierid=id;
  const myDialog :any= document.querySelector('#details');
  myDialog.showModal();
  const tabPanels = document.querySelectorAll('.tab-pane');
const validTabIds = ['seances', 'paiements'];
const tabId = 'seances'; // Définir le tabId à 'seances'

// Itérer sur chaque panneau
tabPanels.forEach((panel) => {
    if (validTabIds.includes(panel.id)) {
        if (panel.id === tabId) {
            panel.classList.add('show', 'active');
        } else {
            panel.classList.remove('show', 'active');
        }
    }
});
const links = document.querySelectorAll('.nav-link'); // Sélectionner tous les liens de navigation
links.forEach(link => {
    if (validTabIds.includes(link.id)) {
        link.classList.remove('active'); // Supprimer la classe active de tous les liens valides
    }
});

const tabLink = document.getElementById(tabId); 
if (tabLink && validTabIds.includes(tabId)) {
    tabLink.classList.add('active'); 
}
 
  this.listrait();
  this.listseances();
 
}
statseance() {
  const myDialog :any= document.querySelector('#statseance');
  myDialog.showModal();
this.seancesTraitsData=[];
let data= this.dossiers.find((item: { did: number; }) => item.did === this.dossierid)
data.details.forEach((item: string) => {
  const elements = item.split(',');
  const id = parseInt(elements[0]);
  const montant = parseInt(elements[1]);
  const nbre = parseInt(elements[2]);
  this.seancesTraitsData.push({ id, montant, nbre });
});
}
statpaie() {
  const myDialog :any= document.querySelector('#statpaie');
  myDialog.showModal();

let data= this.dossiers.find((item: { did: number; }) => item.did === this.dossierid)
this.totaldossiermnt=data.dclmnt;}
closed(id:any){
  const myDialog :any= document.querySelector(id);
  myDialog.close(); 
  
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

tempinvoice(idossier:any){
  const myDialog :any= document.querySelector('#invoice');
  myDialog.showModal();
  this.dossierinfo= this.dossiers.find((item: { did: number; }) => item.did === idossier)
}
closetempinforendez(id:any){
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


patientinfo(){
  this.apiservice.patientsid(this.patid).subscribe(
    (data) => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      this.imgurl='assets/profiles/img'+data.pid+'.png?random='+randomNumber;
      this.infospat=data;
      this.patst=data.pst;
},
error => {
  this.router.navigate(['/patient/']);
});
}
modpatient(){
  
  if(this.formAddpatient.valid){
    this.buttondisable=true;
    const currentDate: Date = new Date();
    this.Newpatient={
      pnom:this.formAddpatient.get('Nom')?.value,
      ptel:this.formAddpatient.get('TL')?.value,
      pnai:this.formAddpatient.get('DN')?.value,
      pgnr:this.formAddpatient.get('GNR')?.value,
      padrss:this.formAddpatient.get('ADRS')?.value,
      
    }
  if((this.Newpatient.ptel).toString().length !== 8) { 
    alert("le numéro de téléphone doit être de 8 chiffres");
    this.buttondisable=false;
    return;
   }
    this.apiservice.modpatient(this.Newpatient,this.patid)
    .subscribe(
      (data) => {
        this.patientinfo();
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

activer(st:any){
  let text = "Êtes-vous certain de passer le patient en mode "+st;
  if (confirm(text) == true) {
    let patst:any;
    if(st=='actif'){
      patst='encours'
    }else{
       patst='inactive'
    }
  this.apiservice.modpatientst(patst,this.patid)
    .subscribe(
      (data) => {
        this.patientinfo();
      
        Swal.fire({
   
          icon: 'success',
          title: "L'état du patient a été changé avec succès.",
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

supprimerpatient(){
  let text = "Attention, êtes-vous sûr de vouloir supprimer le profil du patient ";
  if (confirm(text) == true) {
   
    
  this.apiservice.delpatient(this.patid)
    .subscribe(
      (data) => {
       
        Swal.fire({
   
          icon: 'success',
          title: "Le profil du patient a été supprimé avec succès.",
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
        
        if (result.isConfirmed) {
          this.router.navigate(['/patient/']); 
        } else{
          this.router.navigate(['/patient/']); 
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
  let imgname="img"+this.patid;
  this.apiservice.uploadfile(formData,imgname).subscribe(async res => {  

   // let imgdiv :any = document.getElementById('imgp');
   const randomNumber = Math.floor(Math.random() * 100) + 1;
   this.imgurl='assets/profiles/img'+this.patid+'.png?random='+randomNumber;
   this.modalRef.hide();
   this.buttondisable=false;
        Swal.fire({
   
          icon: 'success',
          title: 'La photo du patient a été remplacée avec succès.',
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

docupload(){
  if(this.formdoc.valid){
    this.buttondisable=true;
        const formData = new FormData();
        formData.append('file', this.file);
        let name= this.formdoc.get('NM')?.value.trim();;
        for (const file of this.listfiles) {
          if (file.name === name) {
            this.buttondisable=false;
             alert('Le nom du document existe déjà ! ')
            
              return;
          }
      }
        this.apiservice.uploadFiledoc(formData,name,this.patid).subscribe(async res => {  
          this.buttondisable=false;
          this.modalRef.hide();
          this.listdocs();
          
          Swal.fire({
   
            icon: 'success',
            title: 'ajouté avec succès.',
          showCancelButton: false,
          confirmButtonText: 'OK',
          //cancelButtonText: 'No, keep it',
        }).then((result) => {
          
         
        })
        
        }
        ,
        (err) =>{ 
          this.buttondisable=false;
          
          alert('Réessayer à nouveau.'); });

      

  }
}
adddossier(){
  if(this.formAdddossier.valid){
    let isValid = this.selected.length > 0 && this.selected.every((item: any) => {
      return item.nbre !== undefined && item.nbre !== null && item.nbre !== '0' && item.nbre >= '1' && item.nbre !== '' &&
             item.prix !== undefined && item.prix !== null && item.prix !== '0' && item.prix >= '1' && item.prix !== '';
    });
    
    
    if (isValid) {
      let assurid=Number(this.formAdddossier.get('ASSRID')?.value);
     
      if (this.assurtaux == 0 && assurid!=0) {
      alert("Le taux de couverture ne doit pas être égal à 0 si le patient est assuré")
        return;
      } 
    } else {
      alert('Assurez-vous que la liste des traitements a été correctement saisie!')
      return;
    }

    this.buttondisable=true;
    let details: any = this.selected.map((item: { id: any;prix:any; nbre: any; }) => `${item.id},${item.prix},${item.nbre}`);
    let total = this.selected.reduce((acc: number, item: { prix: any; nbre: any; }) => {
      const itemTotal = item.prix * item.nbre;
      return acc + itemTotal;
    }, 0); 

 total= total.toFixed(2);
let remisetaux=Number(this.formAdddossier.get('RMS')?.value);
let remisemontant = total * (remisetaux / 100);
remisemontant = parseFloat(remisemontant.toFixed(2));

let totalgeneral = total - remisemontant;
totalgeneral = parseFloat(totalgeneral.toFixed(2));

let partieclient= (totalgeneral *(1-this.assurtaux));
partieclient = parseFloat(partieclient.toFixed(2));

let partieassur= (totalgeneral *(this.assurtaux));
partieassur= parseFloat(partieassur.toFixed(2));


let assur:any=false;

if(this.formAdddossier.get('ASSRID')?.value!=0){
  assur=true;
}



this.Newdossier={
  ddate:this.formAdddossier.get('DT')?.value,
  details: details,
  dpid: this.patid,
  dremise: remisetaux ,
  dmntbr: total,
  dmntar: totalgeneral,
  dassur: assur,
  dassurtaux: this.formAdddossier.get('ASSRTAUX')?.value,
  dassurid: this.formAdddossier.get('ASSRID')?.value,
  dclmnt: partieclient,
  dassurmnt: partieassur,
  dnote: this.formAdddossier.get('NOTE')?.value
  
}

this.apiservice.addDossiers( this.Newdossier)
.subscribe(
  (data) => {
    this.listdossiers();
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


getdossierinfo(id:any){
  let data= this.dossiers.find((item: { did: number; }) => item.did === id)
 
  let ddate=this.datepipe.transform(data.ddate, 'yyyy-MM-dd');
 this.formAdddossier.get('DT')?.setValue(ddate);
 this.formAdddossier.get('NOTE')?.setValue(data.dnote);
 this.formAdddossier.get('ASSRID')?.setValue(data.dassurid);
 this.formAdddossier.get('ASSRTAUX')?.setValue(data.dassurtaux);
 this.formAdddossier.get('RMS')?.setValue(data.dremise);
 let details :any=data.details;
    let listtraitseances: any = details.map((item: string) => {
      let [id, prix,nbre] = item.split(",").map(Number);
      let tname=this.gettraitById(id);
      return { id: id, name:tname,prix:prix, nbre: nbre };
    }); 
  this.selected.push(...listtraitseances);
    this.formAdddossier.get('TR')?.setValue(this.selected );
    this.assurtaux=data.dassurtaux/100;
    this.remise=data.dremise/100;
}
moddossier(){
  if(this.formAdddossier.valid){
    let isValid = this.selected.length > 0 && this.selected.every((item: any) => {
      return item.nbre !== undefined && item.nbre !== null && item.nbre !== '0' && item.nbre >= '1' && item.nbre !== '' &&
             item.prix !== undefined && item.prix !== null && item.prix !== '0' && item.prix >= '1' && item.prix !== '';
    });
    
    
    if (isValid) {
      let assurid=Number(this.formAdddossier.get('ASSRID')?.value);
     
      if (this.assurtaux == 0 && assurid!=0) {
      alert("Le taux de couverture ne doit pas être égal à 0 si le patient est assuré")
        return;
      } 
    } else {
      alert('Assurez-vous que la liste des traitements a été correctement saisie!')
      return;
    }

    this.buttondisable=true;
    let details: any = this.selected.map((item: { id: any;prix:any; nbre: any; }) => `${item.id},${item.prix},${item.nbre}`);
    let total = this.selected.reduce((acc: number, item: { prix: any; nbre: any; }) => {
      const itemTotal = item.prix * item.nbre;
      return acc + itemTotal;
    }, 0); 

 total= total.toFixed(2);
let remisetaux=Number(this.formAdddossier.get('RMS')?.value);
let remisemontant = total * (remisetaux / 100);
remisemontant = parseFloat(remisemontant.toFixed(2));

let totalgeneral = total - remisemontant;
totalgeneral = parseFloat(totalgeneral.toFixed(2));

let partieclient= (totalgeneral *(1-this.assurtaux));
partieclient = parseFloat(partieclient.toFixed(2));

let partieassur= (totalgeneral *(this.assurtaux));
partieassur= parseFloat(partieassur.toFixed(2));


let assur:any=false;

if(this.formAdddossier.get('ASSRID')?.value!=0){
  assur=true;
}



this.Newdossier={
  ddate:this.formAdddossier.get('DT')?.value,
  details: details,
  dremise: remisetaux ,
  dmntbr: total,
  dmntar: totalgeneral,
  dassur: assur,
  dassurtaux: this.formAdddossier.get('ASSRTAUX')?.value,
  dassurid: this.formAdddossier.get('ASSRID')?.value,
  dclmnt: partieclient,
  dassurmnt: partieassur,
  dnote: this.formAdddossier.get('NOTE')?.value
  
}

this.apiservice.updateDossiers( this.dossieridmod,this.Newdossier)
.subscribe(
  (data) => {
    this.listdossiers();
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

deldossier(id:any){
  let text = "Attention, êtes-vous sûr(e) de vouloir supprimer ce dossier  ? ";
  if (confirm(text) == true) {
   
    
  this.apiservice.deleteDossiers(id)
    .subscribe(
      (data) => {
       this.listdossiers();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression du dossier a été effectuée avec succès.",
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

listrendezvous(){
  this.pages=1;
  this.apiservice.getEventsByPID(this.patid).subscribe(
    (data) => {
      
      if(data!=null){
      this.events=data;
      
     
    }else{
      this.events=[];
    }
    },
    error => {
      console.error(error);
    });
}
addrendez(){
  
  if(this.formAddrendez.valid){
    this.buttondisable=true;
  //Annulé Confirmé
    this.Newevent={
      edate:this.formAddrendez.get('DT')?.value,
      etime:this.formAddrendez.get('HR')?.value,
      enote:this.formAddrendez.get('RM')?.value,
      pid:this.patid,
      estat:'En attente'
      
    }

    this.apiservice.createEvent( this.Newevent)
    .subscribe(
      (data) => {
        this.listrendezvous();
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

getrendvousinfo(id:any){
  let data=this.events.find((item: { eid: number; }) => item.eid === id)
    
  let edate=this.datepipe.transform(data.edate, 'yyyy-MM-dd');
  this.formAddrendez.get('DT')?.setValue(edate);
  this.formAddrendez.get('RM')?.setValue(data.enote);
  this.formAddrendez.get('HR')?.setValue(data.etime);
  this.formAddrendez.get('ST')?.setValue(data.estat);
 

}

modrendez(){
  if(this.formAddrendez.valid){
    this.buttondisable=true;
    const currentDate: Date = new Date();
    this.Newevent={
      edate:this.formAddrendez.get('DT')?.value,
      etime:this.formAddrendez.get('HR')?.value,
      enote:this.formAddrendez.get('RM')?.value,
      estat:this.formAddrendez.get('ST')?.value,
      
    }
  
    this.apiservice.updateEvent(this.rendid,this.Newevent)
    .subscribe(
      (data) => {
        this.listrendezvous();
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
delrendezvous(id:any){
  let text = "Attention, Voulez-vous vraiment supprimer ce rendez-vous ? ";
  if (confirm(text) == true) {
   
    
  this.apiservice.deleteEvent(id)
    .subscribe(
      (data) => {
       this.listrendezvous();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression du rendez-vous du patient a été effectuée avec succès.",
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


listdocs() {
  this.pagesfile=1;
  // Vérifier si la chaîne contient "null/"
  

  this.apiservice.listdocs(this.patid)
     .subscribe(
       response => { 
        this.listfiles= response;
        
       },
       error => {
        this.listfiles=[];
        
       }
     );
}
downloadfile(filename:any){
  const Path: string = 'assets/profiles/docs/'+this.patid+'/'+filename+'.pdf';
  window.open(Path, '_blank');

}
renamedoc(){
  if(this.formmoddoc.valid){
    this.buttondisable=true;
    const directory = this.patid; // Ancien nom du dossier
    const oldName =this.oldfileName+'.pdf'; // Ancien nom du dossier
    let newName = this.formmoddoc.get('NM')?.value.trim(); // Nouveau nom du dossier
    newName=newName+'.pdf';
    
    this.apiservice.renamefile(directory,oldName, newName)
      .subscribe(
        response => {
          this.listdocs();
          this.buttondisable=false;
          this.modalRef.hide();
          
          Swal.fire({
   
            icon: 'success',
            title: 'Document renommé avec succès .',
          showCancelButton: false,
          confirmButtonText: 'OK',
          //cancelButtonText: 'No, keep it',
        }).then((result) => {
      
         
        })
        },
        error => {
          this.buttondisable=false;
          alert('Assurez-vous que le nom du document est correctement écrit, vérifiez son existence, puis réessayer à nouveau.')
        }
      );}
}

deletedoc(fileName:any){
  let text = "Etes-vous certain de vouloir supprimer ce document : "+fileName;
  if (confirm(text) == true) {
   
  let fileNamepdf: string = fileName+'.pdf'
  this.apiservice.deletefile(this.patid,fileNamepdf)
     .subscribe(
       response => {
        this. listdocs();
        Swal.fire({
 
          icon: 'success',
          title: 'document supprimé avec succès.',
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
    
        if (result.isConfirmed) {
         
        } 
      })
        
       },
       error => {
        alert('Veuillez vérifier si le dossier contient des fichiers, puis réessayer !')
       }
     );
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

totalpaiement(){
  let total: number = 0;
  this.paiements.forEach((paiement: any) => {
    // Vérifions que paiement.pmnt est bien défini et est un nombre
    if (typeof paiement.pmnt === 'number' && !isNaN(paiement.pmnt)) {
      total += paiement.pmnt;
    }
  });
  
  this.paiements.totals=total;
  
}
listpaiements(){
  this.pages=1;
  this.apiservice.getPaiementbypdos(this.dossierid).subscribe(
    (data) => {
      
      if(data!=null){
      this.paiements=data;
      this.totalpaiement();
     
    }else{
      this.paiements=[];
      this.totalpaiement();
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
      pmode:this.formAddpaie.get('MODE')?.value,
      pmnt:this.formAddpaie.get('MNT')?.value,
      ptype:'in',
      pnote: this.formAddpaie.get('NOTE')?.value,
      ppid:this.patid,
      pdos:this.dossierid,
      pdesc:0
    }

    this.apiservice.addPaiement( this.Newpaie)
    .subscribe(
      (data) => {     
        this.listpaiements();
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
          const myDialog :any= document.querySelector('#details');
        myDialog.showModal();
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
  
}
modpaie(){
  if(this.formAddpaie.valid){
    this.buttondisable=true;
    
   
    this.Newpaie={
      pdate:this.formAddpaie.get('DT')?.value,
      pmode:this.formAddpaie.get('MODE')?.value,
      pmnt:this.formAddpaie.get('MNT')?.value,
      pnote: this.formAddpaie.get('NOTE')?.value,
      pdesc:0
    }

    this.apiservice.updatePaiement(this.paiementid, this.Newpaie)
    .subscribe(
      (data) => {
        this.listpaiements();
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
          const myDialog :any= document.querySelector('#details');
        myDialog.showModal();
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
        const myDialog :any= document.querySelector('#details');
    myDialog.close(); 
       this.listpaiements();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression du paiement a été effectuée avec succès.",
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          const myDialog :any= document.querySelector('#details');
        myDialog.showModal();
        } 
       
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
 selectpaiement(){
  this.listmodepaiement();
  this.listpaiements();
 }

 parseDetails(details: string[]): any[] {
  return details.map(detail => {
    const [id, nbre] = detail.split(',').map(item => item.trim());
    return { id, nbre: parseInt(nbre, 10) };
  });
}

totaliserNbre(): Record<string, number> {
  this.totalsArray=[];
  const totals: Record<string, number> = {};

  // Vérifions que this.seances est bien initialisé et correctement défini
  
    this.seances.forEach((item: { details: string[] }) => {
      // Vérifions que item.details est bien un tableau
      
        item.details.forEach(detail => {
          const [id, nbre] = detail.split(',').map(item => item.trim());
          const parsedNbre = parseInt(nbre, 10);

          if (totals[id]) {
            totals[id] += parsedNbre;
          } else {
            totals[id] = parsedNbre;
          }
        });
      
    });

    for (const id in totals) {
      if (totals.hasOwnProperty(id)) {
        this.totalsArray.push({ id, total: totals[id] });
      }
    }
  
  return totals;
}

getTotalById(id: string): number  {
  const foundItem = this.totalsArray.find((item: { id: string; }) => item.id == id);
  return foundItem ? foundItem.total : 0;
}

 listseances(){
  this.pages=1;
  this.apiservice.getSeancesbysdos(this.dossierid).subscribe(
    (data) => {
      
      if(data!=null){
      this.seances=data;
     this.totaliserNbre();
     
    }else{
      this.seances=[];
    }
    },
    error => {
      console.error(error);
    });
}
addseance(){
  if(this.formAddseance.valid){
    let isValid = this.selected.length > 0 && this.selected.every((item: any) => {
      return item.nbre !== undefined && item.nbre !== null && item.nbre !== '0' &&  item.nbre >= '1' && item.nbre !== '';
    });
    
    if (isValid) {
     
    } else {
      alert('Assurez-vous que la liste des traitements a été correctement saisie!')
      return;
    }

    let details: any = this.selected.map((item: { id: any; nbre: any; }) => `${item.id},${item.nbre}`);
    this.buttondisable=true;
    this.Newseance={
      sdate:this.formAddseance.get('DT')?.value,
      snote: this.formAddseance.get('NOTE')?.value,
      spid:this.patid,
      sdos:this.dossierid,
      details:details
    }

    this.apiservice.addSeance( this.Newseance)
    .subscribe(
      (data) => {
        this.listseances();
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
          const myDialog :any= document.querySelector('#details');
        myDialog.showModal();
        } 
      })
      },
      error => {
        this.buttondisable=false;
        alert("réessayer");
    
       
      }); 
    }
}
getseanceinfo(id:any){
  let data= this.seances.find((item: { sid: number; }) => item.sid === id)
 
  let sdate=this.datepipe.transform(data.sdate, 'yyyy-MM-dd');
 this.formAddseance.get('DT')?.setValue(sdate);
 this.formAddseance.get('NOTE')?.setValue(data.snote);
 let details :any=data.details;

    let listtraitseances: any = details.map((item: string) => {
      let [id, nbre] = item.split(",").map(Number);
      let tname=this.gettraitById(id);
      return { id: id, name:tname, nbre: nbre };
    });
    
  this.selected.push(...listtraitseances);
    this.formAddseance.get('SN')?.setValue(this.selected );

  
}
modseance(){
  if(this.formAddseance.valid){
    let isValid = this.selected.length > 0 && this.selected.every((item: any) => {
      return item.nbre !== undefined && item.nbre !== null && item.nbre !== '0' && item.nbre >= '1' && item.nbre !== '';
    });
    
    if (isValid) {
     
    } else {
      alert('Assurez-vous que la liste des traitements a été correctement saisie!')
      return;
    }

    let details: any = this.selected.map((item: { id: any; nbre: any; }) => `${item.id},${item.nbre}`);
    this.buttondisable=true;
    this.Newseance={
      sdate:this.formAddseance.get('DT')?.value,
      snote: this.formAddseance.get('NOTE')?.value,
      spid:this.patid,
      sdos:this.dossierid,
      details:details
    }

    this.apiservice.updateSeances(this.seancesid, this.Newseance)
    .subscribe(
      (data) => {
        this.listseances();
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
          const myDialog :any= document.querySelector('#details');
          myDialog.showModal();
        } 
      })
      },
      error => {
        this.buttondisable=false;
        alert("réessayer");
    
       
      }); 
    }
}

delseance(id:any){
  let text = "Attention, êtes-vous sûr(e) de vouloir supprimer cette séance ? ";
  if (confirm(text) == true) {
   
    
  this.apiservice.deleteSeances(id)
    .subscribe(
      (data) => {
        const myDialog :any= document.querySelector('#details');
        myDialog.close(); 
       this.listseances();
        Swal.fire({
   
          icon: 'success',
          title: "La suppression de la seance a été effectuée avec succès.",
        showCancelButton: false,
        confirmButtonText: 'OK',
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          const myDialog :any= document.querySelector('#details');
        myDialog.showModal();
        } 
       
      })
      },
      error => {
        
        alert("réessayer");
    
       
      }); 
    }

}

listrait(){
 
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

 listdossiers(){
  this.pages=1;
  this.apiservice.getDossiersbypid(this.patid).subscribe(
    (data) => {
      
      if(data!=null){
      this.dossiers=data;
      
     
    }else{
      this.dossiers=[];
    }
    },
    error => {
      this.dossiers=[];
      console.error(error);
    });
}
listassurs(){

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

getassurtaux(id: any) {
  
  let a:any=this.assurs.find((item: { asid: any; }) => item.asid === id);
  return a?.aspr;
 }

 getassurprix(id: any) {
  
  let a:any=this.assurs.find((item: { asid: any; }) => item.asid === id);
  return a?.asmnt;
 }

 getassurname(id: any) {
  
  let a:any=this.assurs.find((item: { asid: any; }) => item.asid === id);
  return a?.asnm;
 }

 gettraitprix(id: any) {

 
  let a:any=this.traits.find((item: { tid: any; }) => item.tid == id);

  return a?.tmnt;
 }
 tauxchange(e:any){
  let value: any = Number(e.target.value);
  
  if(value==0){
    this.formAdddossier.get('ASSRTAUX')?.setValue(0)
    this.selected.forEach((item: { id:any,prix: number; }) => {
      item.prix = this.gettraitprix(item.id);
  });
  }else{
    
  let taux=this.getassurtaux(value)
  let prix=this.getassurprix(value)
  this.formAdddossier.get('ASSRTAUX')?.setValue(taux);
  this.selected.forEach((item: { prix: number; }) => {
    item.prix = prix;
});
}
this.total();
let a:any;
   this.tauxassurchange(a);
}
total(){
  const total = this.selected.reduce((acc: number, item: { prix: any; nbre: any; }) => {
    // Vérifier si item.prix et item.nbre sont des nombres
    if (!item.prix || !item.nbre || item.prix <= 0 || item.nbre <= 0) {
      return 0; // Ignorer l'élément s'il est invalide
    }
  
  
    // Calculer le produit prix * nbre pour chaque élément
    const itemTotal = item.prix * item.nbre;
  
    // Accumuler dans l'accumulateur
    return acc + itemTotal;
  }, 0); // Démarre l'accumulateur à 0
  
  return total.toFixed(2);
}
tauxremisechange(e:any){
  this.remise=Number(this.formAdddossier.get('RMS')?.value);

  if (this.remise >= 0 && this.remise <= 100) {
    this.remise=this.remise/100;
  } else {
    this.remise=0;
  }

}

tauxassurchange(e:any){
  this.assurtaux=Number(this.formAdddossier.get('ASSRTAUX')?.value);
  let assurid=Number(this.formAdddossier.get('ASSRID')?.value);
 
  if (this.assurtaux >= 0 && this.assurtaux <= 100&& assurid!=0) {
    this.assurtaux=this.assurtaux/100;
  } else {
    this.assurtaux=0;
  }
  
}

hideandopendialog(){
  this.modalRef.hide();
  const myDialog :any= document.querySelector('#details');
  myDialog.showModal();
}
printinvoice(){
  //this.closed('#invoice')
  window.print();
}
}
