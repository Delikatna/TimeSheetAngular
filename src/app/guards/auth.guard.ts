import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
  if (!this.authService.isAuthenticated()) {
    return this.router.createUrlTree(['/accesso-negato']);
  }

  const expectedRoles = route.data['ruoli'] as Array<string> | undefined;
  if (!expectedRoles || expectedRoles.length === 0) {
    return true; // nessun controllo ruolo, basta essere autenticati
  }

  // controlla se il ruolo utente è uno di quelli attesi
  const hasRole = expectedRoles.some(role => this.authService.hasRole(role));

  if (!hasRole) {
    return this.router.createUrlTree(['/accesso-non-autorizzato']);
  }

  return true;
}
}
