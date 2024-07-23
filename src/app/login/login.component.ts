import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo= "*/../assets/logo.png";
  logo2= "*/../assets/logo2.png";
 currentYear: number = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
