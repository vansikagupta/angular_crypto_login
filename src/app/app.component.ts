import { Component } from '@angular/core';
import { AuthServiceService } from './_services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crypto-login';
  app = 'CryptoLoginApp'
  currentUser: any;

  constructor(private auth : AuthServiceService,
              private router : Router) {
    this.auth.currentUser.subscribe(data => this.currentUser = data);
    //this.auth.currentUser.subscribe(data => this.userId = JSON.parse(localStorage.getItem('currentUser'))['id']);
  }

  get loggedUser(){
    //this.userId = JSON.parse(localStorage.getItem('currentUser'))['id']);
    return this.auth.currentUserValue
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
