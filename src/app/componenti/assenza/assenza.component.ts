import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Motivo } from 'src/app/model/enum/motivo.model';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-motivi-assenza',
  templateUrl: './assenza.component.html',
  styleUrls: ['./assenza.component.css']
})
export class AssenzaComponent implements OnInit {
  timeSheetId: number | null = null;
  motiviDisponibili = Object.values(Motivo).filter(m => m !== Motivo.ASSENZA);

  messaggio: string | null = null;
  errore: string | null = null;
  isLoading = false;

  motivoAttuale: Motivo | null = null;
  puoGiustificare = false;

  constructor(
    private route: ActivatedRoute,
    private timeSheetService: TimesheetService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.timeSheetId = +id;
        this.isLoading = true;
        this.timeSheetService.controllaAssenza(id).subscribe({
          next: (response) => {
            this.isLoading = false;
            this.motivoAttuale = response.motivo as Motivo;
            this.puoGiustificare = (this.motivoAttuale === Motivo.ASSENZA);

            // Mostra messaggio se la motivazione NON è assenza
            this.setMessaggioGiustificazione();
          },
          error: (err) => {
            this.isLoading = false;
            this.errore = 'Errore nel caricamento del timesheet';
            console.error(err);
          }
        });
      } else {
        this.errore = "ID del time sheet non trovato nell'URL.";
      }
    });
  }

  selezionaMotivo(motivo: Motivo): void {
    if (!this.timeSheetId) {
      this.errore = "Impossibile procedere: ID non valido.";
      return;
    }

    this.isLoading = true;
    this.messaggio = null;
    this.errore = null;

    this.timeSheetService.modificaAssenza(this.timeSheetId, motivo).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.motivoAttuale = motivo;
        this.puoGiustificare = false;

        this.setMessaggioGiustificazione(); // Centralizza anche qui
      },
      error: (err) => {
        this.isLoading = false;
        this.errore = 'Si è verificato un errore durante la comunicazione con il server. Riprova più tardi.';
        console.error(err);
      }
    });
  }

  private setMessaggioGiustificazione(): void {
    if (this.motivoAttuale && this.motivoAttuale !== Motivo.ASSENZA) {
      this.messaggio = `Grazie! La tua assenza è stata giustificata con motivo: ${this.motivoAttuale.replace('_', ' ')}.`;
    } else {
      this.messaggio = null;
    }
  }
}
