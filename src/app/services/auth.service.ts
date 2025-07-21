import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { RegistrazioneDto } from '../dto/registrazione-dto';
import { AuthRequest } from '../dto/auth-request-dto';
import { AuthResponse } from '../dto/auth-response-dto';
import { Route, Router } from '@angular/router';
import { AnagraficaUtente } from '../model/anagrafica_utente.model';
import { StorageKeys } from '../model/StorageKey.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  

  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private router:Router) {}

  setAuthStatus(status: boolean) {
  this.authStatus.next(status);
}

  
  login(credentials: AuthRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
    tap(response => {
      localStorage.setItem(StorageKeys.TOKEN, response.accessToken);
      localStorage.setItem(StorageKeys.USERNAME, response.username);
      localStorage.setItem(StorageKeys.ROLE, response.role);
      localStorage.setItem(StorageKeys.ID_USER, response.idUser.toString());

      this.setAuthStatus(true);
    })
  );
}


  logout(): void {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  this.clearSessionCompletely();
        this.setAuthStatus(false);
        this.router.navigate(['/welcome']);
}

private clearSessionCompletely(): void {
  localStorage.clear();
  sessionStorage.clear();
}

isAuthenticated(): boolean {
  const token = localStorage.getItem(StorageKeys.TOKEN);
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() < expiry;
  } catch (e) {
    return false;
  }
}

  getToken(): string | null {
    return localStorage.getItem(StorageKeys.TOKEN);
  }

  getRole(): string {
    return localStorage.getItem(StorageKeys.ROLE) || '';
  }

  getUsername(): string {
    return localStorage.getItem(StorageKeys.USERNAME) || '';
  }

  getUserIdFromToken() : string {
    return localStorage.getItem(StorageKeys.ID_USER) || ''
  }
  
  hasRole(role: string): boolean {
  const ruolo = this.getRole();
  return ruolo === role;
}

  
  
}
