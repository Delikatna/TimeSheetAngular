import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatoTimbratura } from '../model/stato-timbratura.model';
import { StoricoTimbrature } from '../model/storico-timbrature';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root'
})
export class TimbraturaService {
  private timbraturaUrl = 'http://localhost:8080/api/timbratura';
  private modificaUrl = 'http://localhost:8080/api/modifica';
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  timbraGenerale(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(`${this.timbraturaUrl}/timbra`, {} , { headers });
  }

  // timbraPomeriggio(): Observable<any> {
  //   return this.http.post(`${this.timbraturaUrl}/pomeriggio`, {}, { headers: this.getAuthHeaders() });
  // }

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

  getStatoTimbratura(): Observable<StatoTimbratura> {
    return this.http.get<StatoTimbratura>(`${this.timbraturaUrl}/stato`, { headers: this.getAuthHeaders() });
  }

  getAllLogs(): Observable<any> {
    return this.http.get(`${this.modificaUrl}/timbraturaLog`, { headers: this.getAuthHeaders() });
  }

  // Nuovo metodo per ottenere lo storico timbrature paginato e filtrato per data
  getStoricoPerData(data: string, page: number, size: number): Observable<Page<StoricoTimbrature>> {
    const params = new HttpParams()
      .set('data', data)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<StoricoTimbrature>>(`${this.baseUrl}/storico-timbrature`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }
}
