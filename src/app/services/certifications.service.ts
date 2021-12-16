import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CertificationsService {
private path:string; 
private httpHeaders = new HttpHeaders; 
  constructor(
    private http:HttpClient
  ) {
    this.path = environment.apiUrl; 
  }
  
  getCertifcations ():Observable<any>  {
    const body = {
      modulo: "Kind_of_Formation"
      
    }
    return this.http.post<any>(this.path,body,{
      headers:this.httpHeaders
    })
  }

}
