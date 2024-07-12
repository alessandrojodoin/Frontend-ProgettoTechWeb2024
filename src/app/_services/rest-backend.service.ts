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

  private jsonHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': ''
    }),
    responseType: 'json' as const,
  };

  private textHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': ''
    }),
    responseType: 'text' as const,
  };

  constructor() { }

  private updateAuthHeader(){
    if(this.auth.isUserAuthenticated()){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.auth.authState.token as string
      })
      this.jsonHttpOptions.headers = headers;
      this.textHttpOptions.headers = headers;
    }
  }

  login(loginCredentials: {username: string, password: string}){
    const url = `${this.url}/auth`;
    return this.http.post<string>(url, loginCredentials, this.jsonHttpOptions);
  }

  signup(signupCredentials: {username: string, password: string}){
    const url = `${this.url}/signup`;
    return this.http.post<string>(url, signupCredentials, this.jsonHttpOptions);
  }

  getIdeas(){
    const url = `${this.url}/ideas`;
    return this.http.get<Idea[]>(url, this.jsonHttpOptions);
  }

  postIdeas(idea: {title: string, description: string}){
    this.updateAuthHeader();
    const url = `${this.url}/ideas`;
    return this.http.post(url, idea, this.textHttpOptions);
  }
    
  

}
