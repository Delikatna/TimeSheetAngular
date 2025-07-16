import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';

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

  constructor(private timesheetService: TimesheetService) {}
  
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

  scaricaExcel(mese:number): void {
    if(!this.annoSelezionato)
      return;

    this.timesheetService.downloadTimesheet(this.annoSelezionato,mese).subscribe({
      next: (blob: Blob) => {
        const nomeFile = `timesheet_${this.annoSelezionato}_${mese}.xlsx`;

        // viene creato un url per il blob
        const blobUrl = window.URL.createObjectURL(blob);

        // usiamo un elemento 'a' temporaneo
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = nomeFile;
        document.body.appendChild(a);
        a.click();

        // puliamo il DOM e la memoria del blob
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      },
      error: (err) => {
        this.messaggio = 'Errore durnte il download del file';
      }
    });
  }

  getNomeMese(mese:number): string {
    const date = new Date();
    date.setMonth(mese - 1);
    return date.toLocaleString('it-IT', { month: 'long'});
  }
}
