import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CryptoService } from '../_services/crypto.service';
import { AuthServiceService } from '../_services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted : boolean = false;
  loading : boolean = false;
  loginForm : FormGroup
  returnUrl : string
  error : string;

  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              private auth : AuthServiceService,
              private router : Router) { 
    
    if(this.auth.currentUserValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required ]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //getter for convenience getter for easy access to form fields
  get fval() {
    return this.loginForm.controls
  }

  onSubmit(loginForm:FormGroup){
    this.submitted = true
    if(this.loginForm.invalid){
      return;
    }//prevents submission if it is invalid.

    console.log('Valid?', loginForm.valid)
    this.loading = true;
    this.auth.login(this.fval.email.value, this.fval.password.value)
    .pipe(first()) //unsubscribes from the observable immediately after the first value is emitted.
    .subscribe(data => {
      if(data){
        this.router.navigate([this.returnUrl])
      }
      else{
        console.log(data, 'Incorrect password');
        this.error = 'Incorrect password'
        this.loading = false;
      }
    },
    error => {
      console.log(error, 'Error');
      this.error = error;
      this.loading = false;
    })
  }

}
