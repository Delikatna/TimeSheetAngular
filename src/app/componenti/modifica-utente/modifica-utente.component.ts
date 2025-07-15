import { Component, OnInit } from '@angular/core';
import { UtenteEAnagraficaDto } from 'src/app/dto/UtenteEAnagraficaDto';
import { AnagraficaUtente } from 'src/app/model/anagrafica_utente.model';
import { Mansione } from 'src/app/model/enum/mansione';
import { AuthService } from 'src/app/services/auth.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-modifica-utente',
  templateUrl: './modifica-utente.component.html',
  styleUrls: ['./modifica-utente.component.css']
})
export class ModificaUtenteComponent implements OnInit{
  
  utenti: UtenteEAnagraficaDto[] = [];
  utentiFiltrati: UtenteEAnagraficaDto[] = [];
  termineRicerca: string = '';
  utenteSelezionato?: UtenteEAnagraficaDto;
  mansioniDisponibili: string[] = Object.values(Mansione);


  constructor(private authService: AuthService, private utenteService: UtenteService) {}
  
  ngOnInit(): void {
    this.caricaTuttiGliUtenti();
  }


  caricaTuttiGliUtenti(): void {
    this.authService.prendiTutteAnagrafe().subscribe({
      next: (data) => {
        this.utenti = data;
        this.utentiFiltrati = data;
      },
      error: (err) => {
        console.error('Errore nel recupero anagrafe utenti');
      }
    });
  }

  filtraUtenti(): void {
    const termine = this.termineRicerca.toLowerCase();
    this.utentiFiltrati = this.utenti.filter(u =>
      u.username?.toLowerCase().includes(termine) ||
      u.nome?.toLowerCase().includes(termine) ||
      u.cognome?.toLowerCase().includes(termine)
    );
  }

  selezionaUtente(utente: UtenteEAnagraficaDto): void {
    this.utenteSelezionato = {...utente};
  }

  salvaModifica(): void {
    if(this.utenteSelezionato) {
      this.authService.modificaAnagrafe(this.utenteSelezionato, this.utenteSelezionato.id).subscribe({
        next: () => {
          console.log('Modifica salavata');
          alert('Anagrafica utente aggiornata');
        },
        error: err => {
          console.error('Errore nel salvataggio della modifica:',err);
          alert('Errore nel salvataggio della modifica');
        }
      });
    }
  }

  chiudiForm(): void {
    this.utenteSelezionato = undefined;
  }



}
