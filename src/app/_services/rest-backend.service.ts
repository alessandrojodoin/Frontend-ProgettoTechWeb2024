import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Idea, User, Reply, Vote } from '../../types';
import { AuthService } from './auth.service';
import { catchError, EMPTY, map } from 'rxjs';
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
    return this.http.get<Idea[]>(url, this.jsonHttpOptions).pipe(
      map(response => {
        response.forEach((value) => {
          value.createdAt = new Date(value.createdAt);
        })
        return response;
      })
    );
  }

  getCurrentWeekIdeas(){
    const url = `${this.url}/ideas`;
    return this.http.get<Idea[]>(url, {...this.jsonHttpOptions, ...{params: new HttpParams().set('maxAge', 7)}}).pipe(
      map(response => {
        response.forEach((value) => {
          value.createdAt = new Date(value.createdAt);
        })
        return response;
      })
    );
  }

  getIdea(id: number){
    const url = `${this.url}/ideas/${id}`;
    return this.http.get<Idea>(url, this.jsonHttpOptions).pipe(
      map(response => ({
        ...response, 
        createdAt: new Date(response.createdAt)
      })))
  }
  

  postIdea(idea: {title: string, description: string}){
    this.updateAuthHeader();
    const url = `${this.url}/ideas`;
    return this.http.post(url, idea, this.textHttpOptions);
  }

  deleteIdea(id: number){
    this.updateAuthHeader();
    const url = `${this.url}/ideas/${id}`;
    return this.http.delete(url, this.textHttpOptions);
  }

  sendVote(ideaId: number, voteType: "upvote" | "downvote"){
    this.updateAuthHeader();
    const url = `${this.url}/ideas/${ideaId}/votes`;
    return this.http.post(url, {voteType: voteType}, this.textHttpOptions);
  }

  cancelVote(ideaId: number){
    this.updateAuthHeader();
    const url = `${this.url}/ideas/${ideaId}/votes`;
    return this.http.delete(url, this.textHttpOptions);
  }
    
  getUserVote(ideaId: number){
    this.updateAuthHeader();
    const url = `${this.url}/ideas/${ideaId}/votes`;
    return this.http.get<Vote>(url, {...this.jsonHttpOptions, ...{params: new HttpParams().set('username', this.auth.authState.user as string)}})
    .pipe(
      catchError(error => EMPTY)
    )
  }
  
  postComment(content: string, ideaId: number){
    this.updateAuthHeader();
    const url = `${this.url}/ideas/${ideaId}/comments`;
    return this.http.post(url, {text: content}, this.textHttpOptions);
  }
  

  getComments(ideaId: number){
    const url = `${this.url}/ideas/${ideaId}/comments`;
    return this.http.get<Reply[]>(url, this.jsonHttpOptions);
  }
}
