import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CryptoService } from './crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted : boolean
  loginForm : FormGroup
  key : string

  constructor(private formBuilder: FormBuilder, private crypt : CryptoService) { 
    this.key = '12##56'
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
    var encrypted = this.crypt.set(this.key, this.loginForm.controls.password.value);
    console.log(encrypted);
    var decrypted = this.crypt.get(this.key, encrypted);
    console.log(decrypted);
  }

}
