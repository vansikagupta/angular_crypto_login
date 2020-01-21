import { Component } from '@angular/core';
import { AuthServiceService } from './_services/auth-service.service';
import { timingSafeEqual } from 'crypto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crypto-login';
  currentUser : any;

  constructor(private auth : AuthServiceService,
              private router : Router) {
    this.auth.currentUser.subscribe(data => this.currentUser = data)
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
