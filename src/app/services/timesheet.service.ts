import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private apiUrl = 'http://localhost:8080/api/excel';

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

}
