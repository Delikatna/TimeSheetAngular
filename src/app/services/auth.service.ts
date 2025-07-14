import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { RegistrazioneDto } from '../dto/registrazione-dto';
import { AuthRequest } from '../dto/auth-request-dto';
import { AuthResponse } from '../dto/auth-response-dto';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private apiRegistrazioneUrl ='http://localhost:8081/api/hr'
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  

  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private router:Router) {}

  setAuthStatus(status: boolean) {
  this.authStatus.next(status);
}

  register(data: RegistrazioneDto): Observable<any> {
    return this.http.post(`${this.apiRegistrazioneUrl}/registrazione`, data);
  }


  login(credentials: AuthRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
    tap(response => {
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('username', response.username);
      localStorage.setItem('role', response.role);
      localStorage.setItem('idUser', response.idUser.toString());
      

      this.setAuthStatus(true); // ora è sicuro emettere il nuovo status

      this.router.navigate(['/']);
    })
  );
}

  logout(): void {
  const token = localStorage.getItem('token');
  if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe({
      next: () => {
        this.clearSessionCompletely();
        this.setAuthStatus(false);
      },
      error: () => {
        // Anche in caso di errore, cancella il token localmente
        this.clearSessionCompletely();
        this.setAuthStatus(false); 
      }
    });
  } else {
    this.clearSessionCompletely();
    this.setAuthStatus(false); 
  }
}

private clearSessionCompletely(): void {
  // Pulisce tutto il localStorage
  localStorage.clear();

  // Se usi sessionStorage
  sessionStorage.clear();

  this.router.navigate(['/login']);

}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
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
}
