import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Motivo } from '../model/enum/motivo.model';
import { TimeSheetMensileDto } from '../model/TimeSheetMensileDto.model';
import { TimeSheetGiornalieroDto } from '../model/TimeSheetGiornalieroDto.model';



  

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  
  private apiUrl = 'http://localhost:8080/api/excel';
  private modificaUrl = 'http://localhost:8080/api/modifica';

  constructor(private http: HttpClient) { }

  getTimesheetPerAnno(anno:number)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>(`${this.apiUrl}/anno/${anno}`, { headers });
  }

  downloadTimesheet(anno: number, mese: number): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/download/${anno}/${mese}`, { headers, responseType: 'blob'});
  }

  getTimesheetMensile(username: string, anno: number, mese: number): Observable<TimeSheetMensileDto> {
  let params = new HttpParams()
    .set('username', username)
    .set('anno', anno.toString())
    .set('mese', mese.toString());

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<TimeSheetMensileDto>(`${this.apiUrl}/timesheets`, { headers, params });
}

  
aggiornaRigaGiornaliera(id: number, aggiornato: Partial<TimeSheetGiornalieroDto>): Observable<string> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post(`${this.apiUrl}/giornaliero/${id}`, aggiornato, {
    headers,
    responseType: 'text'  // 👈 Questo dice ad Angular che riceverà un testo, non JSON
  });
}

downloadTimesheetById(id: number): Observable<Blob> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get(`${this.apiUrl}/download/${id}`, { headers, responseType: 'blob' });
}

 modificaAssenza(id: number, motivo: Motivo): Observable<string> {
  const url = `${this.modificaUrl}/${id}/motivo`;
  const params = new HttpParams().set('motivo', motivo);
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  // Passa null come body, motivo come query param, e specifica responseType
  return this.http.post(url, null, { params, headers, responseType: 'text' });
}

  controllaAssenza(id:string): Observable<TimeSheetGiornalieroDto> {
    const url = `${this.modificaUrl}/${id}`;
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<TimeSheetGiornalieroDto>(url, { headers: headers });
  }

}


