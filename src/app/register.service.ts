import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs'

import { Observable , of } from 'rxjs';
import { catchError } from 'rxjs';
import { User } from './User';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  httpOptions={headers:new HttpHeaders({'Content-type':'json-description'})}
  private url='http://localhost:3000/auth'


  register(user:User):Observable<any>{
  
    return this.http.post<any>(`${this.url}/register`,user).pipe(
      
      catchError(this.handleError<any>('register'))
    );
  
}
login(user:User):Observable<any>{
  
  return this.http.post<any>(`${this.url}/login`,user).pipe(
    
    catchError(this.handleError<any>('login'))
  );

}
private handleError<T>(operation = 'operation'): (error: any) => Observable<T> {
  return (error: any): Observable<T> => {
      console.log(error);
      return throwError(()=>error)
  };
}
}
