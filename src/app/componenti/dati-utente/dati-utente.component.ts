import { Component, OnInit } from '@angular/core';
import { UtenteEAnagraficaDto } from 'src/app/dto/UtenteEAnagraficaDto';
import { AnagraficaUtente } from 'src/app/model/anagrafica_utente.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-dati-utente',
  templateUrl: './dati-utente.component.html',
  styleUrls: ['./dati-utente.component.css']
})
export class DatiUtenteComponent implements OnInit{

  utente!: UtenteEAnagraficaDto;
  errore : string = '';

  constructor(private authService : AuthService, private utenteService: UtenteService) {}
  
  ngOnInit(): void {
    
    const id = this.authService.getUserIdFromToken();
    if(id) {
      this.utenteService.getDatiUtenteById(id).subscribe({
        next: (data) => {
          this.utente = data;
        },
        error: (err) => {
          console.error('Errore nel caricamento dati utente',err);
          this.errore = 'Errore nel caricamento dati utente';
        }
      });
    } else {
      this.errore = 'ID utente non valido o token mancante!'
    }
  }

}
