import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../_helper/must-match.validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  resetPasswordForm: FormGroup
  submitted = false

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern('[A-Za-z]+[A-Za-z0-9_]+')]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('newPassword', 'confirmPassword')//custom validator
    }
    )
  }

  get fval() {
    return this.resetPasswordForm.controls
  }

  onSubmit() {
    this.submitted = true;

    if(this.resetPasswordForm.invalid){
      return
    }
    //return if form is invalid
  }

}
