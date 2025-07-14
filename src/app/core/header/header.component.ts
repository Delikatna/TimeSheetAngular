import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnagraficaUtente } from 'src/app/model/anagrafica_utente.model';
import { Utente } from 'src/app/model/utente.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  utente!: AnagraficaUtente;
  isLoggedIn = false;
  nome='';
  cognome='';
  ruoloHR = false;
  isDropdownOpen = false;

  constructor(private authService: AuthService, private router: Router,private utenteService:UtenteService) {}




  ngOnInit(): void {
  this.authService.authStatus$.subscribe(status => {
    this.isLoggedIn = status;
    if (status) {
      const id = this.authService.getUserIdFromToken();
      if (id) {
        this.utenteService.getUtenteById(id).subscribe({
          next: (utente) => {
            this.utente = utente;
            this.nome = utente.nome;
            this.cognome = utente.cognome;
            this.ruoloHR = this.authService.hasRole('HR');
          },
          error: (err) => console.error('Errore nel recupero utente:', err)
        });
      }
    } else {
      this.nome = '';
      this.cognome = '';
    }
  });
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

  logout(): void {
    this.authService.logout();
  }

   goToLogin() {
    this.router.navigate(['/login']);
  }
}
