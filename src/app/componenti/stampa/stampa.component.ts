import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-stampa',
  templateUrl: './stampa.component.html',
  styleUrls: ['./stampa.component.css']
})
export class StampaComponent implements OnInit {

  anniDisponibili: number[] = [];
  annoSelezionato: number | null = null;
  Timesheets: any[] = [];
  messaggio: string = '';
  id: number = 0;
  nomeCognome: string = '';

  constructor(private timesheetService: TimesheetService, private utenteService: UtenteService, private authService: AuthService) {}
  
  ngOnInit(): void {
    const annoInizio = 2017;
    const annoCorrente = new Date().getFullYear();
    
    for(let anno= annoInizio; anno <= annoCorrente; anno++)
    {
      this.anniDisponibili.push(anno);
    }
  }

  caricaTimesheet(): void {
    if(!this.annoSelezionato)
      return;

    this.timesheetService.getTimesheetPerAnno(this.annoSelezionato)
    .subscribe({
      next: (data) => {
        this.Timesheets = data;
        this.messaggio = data.length === 0 ? 'Nessun timesheet disponibile per l\'anno selezionato' : '';
      },
      error: () => this.messaggio = 'Errore durante il recupero dei timesheet.'
    });
  }

  scaricaExcel(mese: number): void {
  if (!this.annoSelezionato) 
    return;

  const id = this.authService.getUserIdFromToken();

  this.utenteService.getNomeCognome(id).subscribe({
    next: (data) => {
      this.nomeCognome = `${data.nome}_${data.cognome}`;

      this.timesheetService.downloadTimesheet(this.annoSelezionato!, mese).subscribe({
        next: (blob: Blob) => {
          const nomeFile = `timesheet_${this.nomeCognome}_${this.annoSelezionato}_${mese}.xlsx`;

          const blobUrl = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = nomeFile;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobUrl);
        },
        error: () => {
          this.messaggio = 'Errore durante il download del file';
        }
      });
    },
    error: () => {
      this.messaggio = 'Errore nel recupero dei dati utente';
    }
  });
}


  getNomeMese(mese:number): string {
    const date = new Date();
    date.setMonth(mese - 1);
    return date.toLocaleString('it-IT', { month: 'long'});
  }
}
