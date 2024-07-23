import { inject, Injectable, Injector } from '@angular/core';
import { RestBackendService } from './rest-backend.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, EMPTY, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


type AuthState = {
  user: string | null,
  token: string | null,
  readonly isTokenValid: boolean
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private injector = inject(Injector);

  authState: AuthState = {
    user: null,
    token: null,
    get isTokenValid(){
      try{
        if(this.token === null){
          return false;
        }
        else{
          const expiration = jwtDecode(this.token).exp;
          if(expiration === undefined || Date.now() >= expiration * 1000){
            return false;
          }
        }
        return true;
      }
      catch(error){
        return false;
      }
    }

    
  }

  constructor() {
    this.authState.token = localStorage.getItem("token");
    if(this.authState.token !== null){
      const decodedToken: any = jwtDecode(this.authState.token);
      this.authState.user = decodedToken.user as string;
    }

  }

  private setToken(token: string){
    localStorage.setItem("token", token);
    this.authState.token = token;
    const decodedToken: any = jwtDecode(token);
    this.authState.user = decodedToken.user as string;
  }

  private getToken(): string | null{
    return localStorage.getItem("token");
  }

  login(loginCredentials: {username: string, password: string}){
    const rest = this.injector.get(RestBackendService);
    const request = rest.login(loginCredentials);
    request.pipe(catchError((error) => EMPTY)).subscribe({
      next: (token) => {
        this.setToken(token);
      },
      error: (error) => {
      },
      complete: () => {}

    })
    return request;

  }

  isUserAuthenticated(): boolean {
    return this.authState.isTokenValid
  }

  getUsername(): string {
    if(this.authState.user){
      return this.authState.user;
    }
    else return "";
   
  }

  logout(){
    this.authState.user = null;
    this.authState.token = null;
    localStorage.removeItem("token");
  }


}
