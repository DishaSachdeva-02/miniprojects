import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable , of } from 'rxjs';
import { catchError } from 'rxjs';
import { App } from './App';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  httpOptions={headers:new HttpHeaders({'Content-Type': 'application/json',
  authorization: `${localStorage.getItem('authorization')}`})}
  private url='http://localhost:3000/applications'


  getapplication():Observable<App[]>{
    return this.http.get<App[]>(this.url,this.httpOptions).pipe(
  
     catchError(this.handleError<App[]>('getapplication',[]))
    );
  }
  getapplicationbyid(id:string):Observable<App>{
    return this.http.get<App>(`${this.url}/${id}`,this.httpOptions).pipe(
     
      catchError(this.handleError<App>(`getapplicationbyid id=${id}`))
    );
  }
  deleteapplication(id:string):Observable<App>{
    return this.http.delete<App>(`${this.url}/${id}`, this.httpOptions).pipe(
     
      catchError(this.handleError<App>('deleteapplication'))
    )
  }
  addapp(app:App):Observable<App>{
  
    return this.http.post<App>(this.url,app,this.httpOptions).pipe(
      
      catchError(this.handleError<App>('addapp'))
    );
  
}
updateapp(app:App):Observable<any>{
  return this.http.put(`${this.url}/${app._id}`,app,this.httpOptions).pipe(
   
    catchError(this.handleError<any>('updateapp'))
  );
}
  private handleError<T>(operation='operation', result?:T){
    return (error:any):Observable<T>=>{

     console.log(error);
      return of(result as T)
    }
 }
}
