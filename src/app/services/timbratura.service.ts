import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TimbraturaService {
  private timbraturaUrl = 'http://localhost:8080/api/timbratura';
  private modificaUrl = 'http://localhost:8080/api/modifica';
  

  constructor(private http:HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
timbraMattina(): Observable<any> {
  return this.http.post(`${this.timbraturaUrl}/mattina`, {}, { headers: this.getAuthHeaders() });
}

timbraPomeriggio(): Observable<any> {
  return this.http.post(`${this.timbraturaUrl}/pomeriggio`, {}, { headers : this.getAuthHeaders() });
}

timbraStraordinario(): Observable<any> {
  return this.http.post(`${this.timbraturaUrl}/straordinario`, {}, { headers: this.getAuthHeaders() });
}

timbraAssenza(motivo: string): Observable<any> {
  const params = new HttpParams().set('motivo', motivo.toUpperCase());
  return this.http.post(`${this.timbraturaUrl}/assenza`, {}, {
    headers: this.getAuthHeaders(),
    params: params
  });
}

getAllLogs(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.modificaUrl}/timbraturaLog`, { headers });
}


}
