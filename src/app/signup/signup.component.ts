import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestBackendService } from '../_services/rest-backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private rest = inject(RestBackendService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  signupForm = new FormGroup({
    username: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
    password: new FormControl('',
      [Validators.required,
        Validators.minLength(1)]
    ),
  })

  onSubmit(){
    if(this.signupForm.invalid){
      this.toastr.error("Please make sure you have filled all of the fields", "Error");
    }
    else{
      this.rest.signup({
        username: this.signupForm.value.username as string,
        password: this.signupForm.value.password as string
      }).subscribe({
        error: (error) =>{
          if(error instanceof HttpErrorResponse){
            this.toastr.error(error.error.message);
          }
        },
        next: ()=> {
          this.toastr.success("Signed up successfully!", "Success");
          this.router.navigate(["/login"]);
        }
    });
    }

  }
}
