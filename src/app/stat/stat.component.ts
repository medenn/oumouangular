import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { writeFile } from 'fs';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  charg= "*/../assets/charg.gif";
  modalRef: any;
  traits:any=[];
  stardate:any;
  enddate:any;
  statglb:any=[];
  etat:any='Tous';
  totalFeminin:any=0;
  totalMasculin:any=0;
  @ViewChild('templatepatientez') templatepatientez: any;
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe) { 
    this.setDates();
    this.listrait();
    this.statglobal();
  }

  ngOnInit(): void {
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
openmodal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray modal-lg' })
  );

}

  stat(){
    this.openmodal(this.templatepatientez);
    this.apiservice.stat(this.stardate,this.enddate).subscribe(
      (data) => {
     if(data!=null){  
      this.exportToExcel(data)
    
    }else{
      alert("Aucun résultat n'a été trouvé pour la période de dates demandée.")
    }
      },
      error => {
        console.error(error);
        setTimeout(() => {
        
          this.modalRef.hide();
        }, 1000);
      });
  }

  statglobal(){
    this.statglb=[]; 
       this.apiservice.statglobal().subscribe(
         (data) => {
          let e:any;
           this.statglb=data;
           this.filtrerEtat(e);
          // this.exportToExcel(data)
         },
         error => {
         
           console.error(error);
         });
     }

     filtrerEtat(e: any) {
      this.totalFeminin=0;
      this.totalMasculin=0;
      if (this.etat === 'Tous') {
          // Totaliser le nombre de patients par pgnr
          this.statglb.forEach((item: { pgnr: string; nombre_patients: any; }) => {
              if (item.pgnr === 'Feminin') {
                  this.totalFeminin += item.nombre_patients;
              } else if (item.pgnr === 'Masculin') {
                  this.totalMasculin += item.nombre_patients;
              }
          });
      } else {
          // Totaliser le nombre de patients par pgnr et par pst équivalant à this.etat
          this.statglb.forEach((item: { pst: any; pgnr: string; nombre_patients: any; }) => {
              if (item.pst === this.etat) {
                  if (item.pgnr === 'Feminin') {
                      this.totalFeminin += item.nombre_patients;
                  } else if (item.pgnr === 'Masculin') {
                      this.totalMasculin += item.nombre_patients;
                  }
              }
          });
      }
  }
  
  exportToExcel(dataStat: any): void {
    const ageGroups = ["0-4", "5-14", "15-39", "40-59", "60+"];
    const genders = ["M", "F"];
    
    const result = [];

    // Créer l'en-tête du tableau avec des sous-colonnes simplifiées
    const header = [
        "Pathologie",
        ...ageGroups.flatMap(group => [`${group} M`, `${group} F`]),
        "Total M",
        "Total F",
        "Total Patients",
        "Nombre de Séances à Réaliser"
    ];
    result.push(header);
  
    // Grouper les données par idtraitement
    const groupedData: { [key: string]: any } = {};
  
    dataStat.forEach((item: { age_group: any; idtraitement: any; pgnr: any; patient_count: any; total_nbreseance: any; }) => {
        const { age_group, idtraitement, pgnr, patient_count, total_nbreseance } = item;

        // Normaliser age_group et pgnr
        const normalizedAgeGroup = age_group.replace("ans", "").trim();
        const normalizedGender = pgnr === "Masculin" ? "M" : "F";

        if (!groupedData[idtraitement]) {
            groupedData[idtraitement] = {
                idtraitement,
                "0-4 M": 0,
                "0-4 F": 0,
                "5-14 M": 0,
                "5-14 F": 0,
                "15-39 M": 0,
                "15-39 F": 0,
                "40-59 M": 0,
                "40-59 F": 0,
                "60+ M": 0,
                "60+ F": 0,
                "Total M": 0,
                "Total F": 0,
                "Total Patients": 0,
                "Nombre de Séances à Réaliser": 0 // Initialiser le total des séances à 0
            };
        }

        groupedData[idtraitement][`${normalizedAgeGroup} ${normalizedGender}`] += patient_count;
        if (normalizedGender === "M") {
            groupedData[idtraitement]["Total M"] += patient_count;
        } else if (normalizedGender === "F") {
            groupedData[idtraitement]["Total F"] += patient_count;
        }
        groupedData[idtraitement]["Total Patients"] += patient_count;

        // Accumuler le total des séances à réaliser
        groupedData[idtraitement]["Nombre de Séances à Réaliser"] += total_nbreseance;
    });
  
    // Ajouter les données au tableau
    for (const key in groupedData) {
        const row = [
            this.gettraitById(groupedData[key].idtraitement),
            groupedData[key]["0-4 M"],
            groupedData[key]["0-4 F"],
            groupedData[key]["5-14 M"],
            groupedData[key]["5-14 F"],
            groupedData[key]["15-39 M"],
            groupedData[key]["15-39 F"],
            groupedData[key]["40-59 M"],
            groupedData[key]["40-59 F"],
            groupedData[key]["60+ M"],
            groupedData[key]["60+ F"],
            groupedData[key]["Total M"],
            groupedData[key]["Total F"],
            groupedData[key]["Total Patients"],
            groupedData[key]["Nombre de Séances à Réaliser"]
        ];
        result.push(row);
    }
  
    // Convertir les données en format de tableau pour Excel
    const ws = XLSX.utils.aoa_to_sheet(result);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Feuille1");
    const fileName = 'listpatients.xlsx';
    console.log('Exporting to Excel...');
   
    setTimeout(() => {
      XLSX.writeFile(wb, fileName);
      this.modalRef.hide();
    }, 2000);
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

 chercher(){
  if (!this.stardate || !this.enddate ) {
    alert('La date que vous avez entrée est invalide. Veuillez vérifier et réessayer.');
    return;
  }else {
    if(this.stardate > this.enddate){
      alert('La date de fin ne peut pas être antérieure à la date de début.');
      return;
    }
    this.stat();
  }

 }
 setDates() {
  const currentDate = new Date();

  // Début du mois actuel
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // Fin du mois actuel
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Formatage des dates
  this.stardate = this.datepipe.transform(startOfMonth, 'yyyy-MM-dd');
  this.enddate = this.datepipe.transform(endOfMonth, 'yyyy-MM-dd');
}
}
