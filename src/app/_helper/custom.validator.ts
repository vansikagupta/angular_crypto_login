import { FormGroup, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors.mustMatch){
            return;
        }

        if(control.value !== matchingControl.value){
            matchingControl.setErrors({ mustMatch:true });
        }
        else{
            matchingControl.setErrors(null);
        }
    }
}

export function patternValidator(regex : RegExp, error:ValidationErrors){
    return (control: AbstractControl) => {
        if (!control.value) {
            // if control is empty return no error
            return null;
          }
      
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
      
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null : error;
    }  
}