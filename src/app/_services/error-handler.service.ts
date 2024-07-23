import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  router = inject(Router);
  constructor() { }

  error: {message: string, status: number} = {status: 500, message: "Application Error"};

  setError(error: {status: number, message: string}){
    this.error = error;
    this.router.navigate
  }
}
