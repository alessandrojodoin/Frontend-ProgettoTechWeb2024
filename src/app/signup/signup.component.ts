import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestBackendService } from '../_services/rest-backend.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private rest = inject(RestBackendService);
  signupForm = new FormGroup({
    username: new FormControl('',
      Validators.required,
    ),
    password: new FormControl('',
      Validators.required
    ),
  })

  onSubmit(){
    this.rest.signup({
      username: this.signupForm.value.username as string,
      password: this.signupForm.value.password as string
    }).subscribe();
  }
}
