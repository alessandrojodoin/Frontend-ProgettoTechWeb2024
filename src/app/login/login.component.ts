import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestBackendService } from '../_services/rest-backend.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  loginForm = new FormGroup({
    username: new FormControl('',
      Validators.required,
    ),
    password: new FormControl('',
      Validators.required
    ),
  })

  onSubmit(){
    this.authService.login({
      username: this.loginForm.value.username as string,
      password: this.loginForm.value.password as string
    })
  }
}

