import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Idea, User, Reply } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class RestBackendService {
  private http = inject(HttpClient);
  private url = "http://localhost:3000";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'json' as const,
  };

  constructor() { }

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


}
