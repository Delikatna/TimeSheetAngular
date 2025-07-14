import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../model/utente.model';
import { AnagraficaUtente } from '../model/anagrafica_utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http:HttpClient) { }

  private apiUrl='http://localhost:8081/api/hr'

  getUtenteById(id: string): Observable<AnagraficaUtente> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<AnagraficaUtente>(`${this.apiUrl}/${id}`, { headers });
}
}
