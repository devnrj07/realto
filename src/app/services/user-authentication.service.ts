import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';

import { map } from 'rxjs/operators';
import { User } from '../common/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  
  private url = `` || 'https://realto-task-api.herokuapp.com/users';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any> (JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): any{
     return this.currentUserSubject.value;
   }

   login(email,password){
     

     const headers = new HttpHeaders({'Content-Type':'application/json'});
     
     
    return this.http.post<any>(this.url+'/login',{email,password},{headers})
      .pipe(map(data=>{

       const token = data.token;
        //set the logged in user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(email));
        localStorage.setItem('token',JSON.stringify(token));
        
      }))
   }

   /* setCurrentUser(){
     const jwtToken = `bearer ${JSON.parse(localStorage.getItem('token'))}`
     let headers:HttpHeaders = new HttpHeaders();
     headers.set('authorization',jwtToken);

     return this.http.get<any>(this.url,{headers})
     .pipe(map(user =>{
       // store user details and jwt token in local storage to keep user logged in between page refreshes
       localStorage.setItem('currentUser', JSON.stringify(user));
       this.currentUserSubject.next(user);
       return user;
     }))
   } */

   logout(){
     localStorage.clear();
     this.currentUserSubject.next(null);
   }
}
