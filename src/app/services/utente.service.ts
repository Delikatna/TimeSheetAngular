import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnagraficaUtente } from '../model/anagrafica_utente.model';
import { UtenteEAnagraficaDto } from '../dto/UtenteEAnagraficaDto';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http:HttpClient) { }

  private apiUrl='http://localhost:8081/api/public';
  private apiUtenteUrl = 'http://localhost:8081/api/utente';

  getUtenteById(id: string): Observable<AnagraficaUtente> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<AnagraficaUtente>(`${this.apiUrl}/${id}`, { headers });
}

  getDatiUtenteById(id: string): Observable<UtenteEAnagraficaDto> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<UtenteEAnagraficaDto>(`${this.apiUtenteUrl}/${id}`, { headers });
}
}
