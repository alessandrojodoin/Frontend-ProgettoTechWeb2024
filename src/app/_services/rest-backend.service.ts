import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Idea, User, Reply } from '../../types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {
  private auth = inject(AuthService);
  private http = inject(HttpClient);
  private url = "http://localhost:3000";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': ''
    }),
    responseType: 'json' as const,
  };

  constructor() { }

  private updateAuthHeader(){
    if(this.auth.isUserAuthenticated()){
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.auth.authState.token as string
      })
    }
  }

  login(loginCredentials: {username: string, password: string}){
    const url = `${this.url}/auth`;
    return this.http.post<string>(url, loginCredentials, this.httpOptions);
  }

  signup(signupCredentials: {username: string, password: string}){
    const url = `${this.url}/signup`;
    return this.http.post<string>(url, signupCredentials, this.httpOptions);
  }

  getIdeas(){
    const url = `${this.url}/ideas`;
    return this.http.get<Idea[]>(url, this.httpOptions);
  }

  postIdeas(idea: {title: string, description: string}){
    this.updateAuthHeader();
    const url = `${this.url}/ideas`;
    return this.http.post<string>(url, idea, this.httpOptions);
  }
    
  

}
