import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TimbraturaService {
  private baseUrl = 'http://localhost:8081/api/timbratura';

  constructor(private http:HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
timbraMattina(): Observable<any> {
  return this.http.post(`${this.baseUrl}/mattina`, {}, { headers: this.getAuthHeaders() });
}

timbraPomeriggio(): Observable<any> {
  return this.http.post(`${this.baseUrl}/pomeriggio`, {}, { headers: this.getAuthHeaders() });
}

timbraStraordinario(): Observable<any> {
  return this.http.post(`${this.baseUrl}/straordinario`, {}, { headers: this.getAuthHeaders() });
}

}
