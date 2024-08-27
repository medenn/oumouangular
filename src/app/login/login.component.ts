import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo= "*/../assets/logo.png";
  logo2= "*/../assets/logo2.png";
  formLogin = new FormGroup({
    username: new FormControl('', Validators.required ),
    mdp: new FormControl('', Validators.required ),
  });
  buttondisable:any=false; 
 currentYear: number = new Date().getFullYear();
  constructor(private modalService: BsModalService,private router:Router,private route: ActivatedRoute,private apiservice: ApiserviceService,private datepipe: DatePipe) { 
    if( localStorage.getItem('token')!=null   ){
      this.router.navigate(['/patient']);
    }
  }

  ngOnInit(): void {
  }


login(){

  if(this.formLogin.valid){
  
      let username=this.formLogin.get('username')?.value;
      let mdp =this.formLogin.get('mdp')?.value;
    
      this.buttondisable=true;
    this.apiservice.login(username,mdp)
    .subscribe(
      response => {
        
        this.buttondisable=false;
        Swal.fire({
 
          icon: 'success',
          title: 'Bienvenu '+username,
        showCancelButton: false,
        confirmButtonText: 'OK',
        
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
    
      
      })
     this.router.navigate(['/patient']);

      },
      error => {
        //alert("veuillez réessayer !");
        this.buttondisable=false;
        Swal.fire({
 
          icon: 'error',
          title: 'Veuillez réessayer !',
        showCancelButton: false,
        confirmButtonText: 'OK',
        
        //cancelButtonText: 'No, keep it',
      }).then((result) => {
    
      
      })
      }); 

    }
  
}

getitem(){
  let t:any='token';
  this.apiservice.getItemWithExpiry(t);
}
  
  


}
