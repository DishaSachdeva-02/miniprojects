import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable , of } from 'rxjs';
import { catchError } from 'rxjs';
import { App } from './App';
import { comment } from './Comment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  httpOptions={headers:new HttpHeaders({'Content-Type': 'application/json',
  authorization: `${localStorage.getItem('authorization')}`})}
  private url='http://localhost:3000/applications'
  private url1='http://localhost:3000/applications/comment'
  private url2='http://localhost:3000/downloads'


  //application

  getapplication():Observable<App[]>{
    return this.http.get<App[]>(this.url,this.httpOptions).pipe(
  
     catchError(this.handleError<App[]>('getapplication'))
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

//commnets

addcomment(comm:comment,id:string):Observable<comment>{
  
  return this.http.post<comment>(`${this.url1}/${id}`,comm,this.httpOptions).pipe(
    
    catchError(this.handleError<comment>('addcomment'))
  );

}

deletecomment(id:string):Observable<comment>{
  return this.http.delete<comment>(`${this.url1}/delete/${id}`, this.httpOptions).pipe(
   
    catchError(this.handleError<comment>('deletecomment'))
  )
}



//downloads
addtodownload(id:string):Observable<App>{
  
  return this.http.post<App>(`${this.url2}/${id}`,'',this.httpOptions).pipe(
    
    catchError(this.handleError<App>('addtodownload'))
  );

}
getdownload():Observable<string[]>{
  return this.http.get<string[]>(this.url2,this.httpOptions).pipe(

   catchError(this.handleError<string[]>('getdownload'))
  );
}
deletedownload(id:string):Observable<string[]>{
  return this.http.delete<string[]>(`${this.url2}/${id}`, this.httpOptions).pipe(
   
    catchError(this.handleError<string[]>('deletedownload'))
  )
}

 // error handling

 private handleError<T>(operation = 'operation'): (error: any) => Observable<T> {
  return (error: any): Observable<T> => {
      console.log(error);
      return throwError(()=>error)
  };
}
}
