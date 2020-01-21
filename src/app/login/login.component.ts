import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CryptoService } from '../_services/crypto.service';
import { AuthServiceService } from '../_services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted : boolean
  loginForm : FormGroup
  key : string

  constructor(private formBuilder: FormBuilder, private crypt : CryptoService, private auth : AuthServiceService) { 
    this.key = 'pk#91@01'
    this.submitted = false
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)] ]
    })
  }

  onSubmit(loginForm:FormGroup){
    this.submitted = true
    console.log('Valid?', loginForm.valid)
    /*
    var encrypted = this.crypt.set(this.key, this.loginForm.controls.password.value);
    console.log(encrypted);
    var decrypted = this.crypt.get(this.key, encrypted);
    console.log(decrypted);
    */
    //console.log(this.loginForm.controls.password.value)
    this.auth.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
  }

}
