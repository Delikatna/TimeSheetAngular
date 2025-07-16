// storico.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/page.model';
import { StoricoTimbrature } from '../model/storico-timbrature';

@Injectable({
  providedIn: 'root'
})
export class StoricoService {

  private baseUrl = '/api/storico-timbrature';  // modifica con il tuo endpoint

  constructor(private http: HttpClient) {}

 getStoricoPerGiorno(data: string, page: number, size: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  });

  const params = new HttpParams()
    .set('data', data)
    .set('page', page)
    .set('size', size);

  return this.http.get<any>('http://localhost:8080/api/storico-timbrature', { headers, params });
}
}
