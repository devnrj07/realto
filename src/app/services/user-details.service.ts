import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private url = `` || 'https://realto-task-api.herokuapp.com/users';
  private headers;
     
  constructor(private http: HttpClient) {
    const jwtToken = `bearer ${JSON.parse(localStorage.getItem('token'))}`
    
       this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': jwtToken });
   }

  getAllUsers(page:String = '1',per_page:String = '10'){
    
    return this.http.get<User[]>(this.url+`?page=${page}&per_page=${per_page}`, {headers:this.headers});
  }

  registerUser(user:User){
    console.log(user)
    return this.http.post(this.url,user);
  }
  //doubt
  updateUser(user:User){
    return this.http.put(this.url,user,{headers:this.headers})
  }

  deleteUser(){
    return this.http.delete<any>(this.url, {headers:this.headers})
  }

}
