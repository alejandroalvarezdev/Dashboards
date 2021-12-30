import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class ObjectivesService {

    private path: string;
    private httpHeaders = new HttpHeaders;


    constructor(
    private http: HttpClient
    ) {
    this.path = environment.apiUrl;
    }

    getObjectives(): Observable<any> {
    const body = {
        modulo: "Objective1"
    };
    return this.http.post<any>(this.path, body, {
        headers: this.httpHeaders
    });
    }
}
