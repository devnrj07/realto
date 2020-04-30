import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { User } from '../common/models/user';
import { catchError,retryWhen, tap, concatMap, delay, take } from 'rxjs/operators';
import { throwError, of, concat } from 'rxjs';
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
      'Authorization': jwtToken
    });
  }

  getAllUsers(page: String = '1', per_page: String = '8') {

    return this.http.get<User[]>(this.url + `?page=${page}&per_page=${per_page}`, { headers: this.headers }).pipe(
      take(1),
      // Next for presentational purposes;
      // We want to display the error output alongside with successful result
      catchError(err => {
        
        return throwError(err);
      }),
      retryWhen(errors => errors
        .pipe(
          concatMap((error, count) => {
            if (count < 5 && (error.status == 400 || error.status == 0 || error.status == 401)) {
              console.log("err", error, "count", count);
              return of(error.status);
            }

            return throwError(error);
          }),
          delay(1000),
          take(3),
          o => concat(o, throwError(`Sorry, there was no result after 3 retries)`))
        )
      )
    );
  }

  registerUser(user: User) {
    console.log(user)
    return this.http.post(this.url, user);
  }
  //doubt
  updateUser(user: User) {
    return this.http.put(this.url, user, { headers: this.headers })
  }

  deleteUser() {
    return this.http.delete<any>(this.url, { headers: this.headers })
  }

}
