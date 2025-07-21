import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { RegistrazioneDto } from '../dto/registrazione-dto';
import { AuthRequest } from '../dto/auth-request-dto';
import { AuthResponse } from '../dto/auth-response-dto';
import { Route, Router } from '@angular/router';
import { AnagraficaUtente } from '../model/anagrafica_utente.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private apiHrUrl ='http://localhost:8081/api/hr'
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  

  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private router:Router) {}

  setAuthStatus(status: boolean) {
  this.authStatus.next(status);
}

  register(data: RegistrazioneDto): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(`${this.apiHrUrl}/registrazione`, data, { headers });
  }


  login(credentials: AuthRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
    tap(response => {
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('username', response.username);
      localStorage.setItem('role', response.role);
      localStorage.setItem('idUser', response.idUser.toString());
      

      this.setAuthStatus(true); 

      this.router.navigate(['/']);
    })
  );
}

  logout(): void {
  const token = localStorage.getItem('token');
  this.clearSessionCompletely();
        this.setAuthStatus(false);
        this.router.navigate(['/welcome']);
}

private clearSessionCompletely(): void {
  // Pulisce tutto il localStorage
  localStorage.clear();

  // Se si usa il sessionStorage
  sessionStorage.clear();
}

isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; 
    return Date.now() < expiry;
  } catch (e) {
    return false;
  }
}


  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getUserIdFromToken() : string {
    return localStorage.getItem('idUser') || ''
  }
  
  hasRole(role: string): boolean {
  const ruolo = localStorage.getItem('role');
  return ruolo === role;
}

  modificaAnagrafe(data: AnagraficaUtente, id: number): Observable<string> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(`${this.apiHrUrl}/aggiorna/${id}`, data, { headers, responseType: 'text' }); //text perché la modifica si aspetta un testo e non un JSON
  }

  prendiTutteAnagrafe(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get(`${this.apiHrUrl}/tutte`, { headers });
  }
  
}
