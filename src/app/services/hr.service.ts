import { Injectable } from '@angular/core';
import { RegistrazioneDto } from '../dto/registrazione-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnagraficaUtente } from '../model/anagrafica_utente.model';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  private apiHrUrl ='http://localhost:8081/api/hr';

  constructor(private http: HttpClient, private router:Router) { }

  registrazione(data: RegistrazioneDto): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
      return this.http.post(`${this.apiHrUrl}/registrazione`, data, { headers });
    }

  modificaAnagrafe(data: AnagraficaUtente, id: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(`${this.apiHrUrl}/aggiorna/${id}`, data, { headers, responseType: 'text' });
  }

  prendiTutteAnagrafe(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get(`${this.apiHrUrl}/tutte`, { headers });
  }
    
}
