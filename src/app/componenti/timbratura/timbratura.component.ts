import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TimbraturaService } from 'src/app/services/timbratura.service';
import { MotivazioneDialogComponent } from '../motivazione/motivazione.component';
import { StatoTimbratura } from 'src/app/model/stato-timbratura.model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-timbratura',
  templateUrl: './timbratura.component.html',
  styleUrls: ['./timbratura.component.css']
})
export class TimbraturaComponent implements OnInit {
  ruoloHR = false;

  stepLabels = [
    'Ingresso M',
    'Uscita M',
    'Ingresso P',
    'Uscita P'
  ];

  statoTimbratura: StatoTimbratura = {
    uscitaPomeriggio: false,
    entrataStraordinario: false,
    uscitaStraordinario: false,
    assenzaSegnata: false,
    entrataMattina: false,
    uscitaMattina: false,
    entrataPomeriggio: false
  };

  stepCorrente = 0;
  isModalOpen = false;
  messaggioOrarioAuto = '';
  mostraMessaggioOrarioAuto = false;

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild(MotivazioneDialogComponent) motivazioneDialog!: MotivazioneDialogComponent;

  constructor(
    private timbraturaService: TimbraturaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ruoloHR = this.authService.hasRole('HR');
    this.caricaStatoTimbrature();
  }

  caricaStatoTimbrature() {
    this.timbraturaService.getStatoTimbratura().subscribe({
      next: (stato) => {
        this.statoTimbratura = stato;
        console.log('Stato timbratura caricato:', this.statoTimbratura);
        this.stepCorrente = this.calcolaStepCorrente(stato);
      },
      error: (err) => {
        console.error('Errore durante il caricamento dello stato delle timbrature', err);
      }
    });
  }

  /**
   * Logica di calcolo dello step riscritta per dare priorità all'orario corrente
   * e gestire correttamente i salti al pomeriggio.
   */
  calcolaStepCorrente(stato: StatoTimbratura): number {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Definisce gli intervalli di tempo precisi come richiesto
    const isAfternoonTime = hour >= 14 && (hour < 19 || (hour === 19 && minute <= 20)); // 14:00 to 19:20

    // --- LOGICA POMERIDIANA ---
    // Se è orario pomeridiano, questa logica ha la precedenza.
    if (isAfternoonTime) {
      // Se manca l'ingresso pomeridiano, questo è lo step corrente, a prescindere dalla mattina.
      if (!stato.entrataPomeriggio) {
        if (!stato.entrataMattina) {
          this.mostraMessaggioTemporaneo("È pomeriggio, si parte con la timbratura pomeridiana.");
        } else if (!stato.uscitaMattina) {
          this.mostraMessaggioTemporaneo("Uscita mattutina non timbrata. Si procede con l'ingresso pomeridiano.");
        }
        return 2; // Forza lo step a 'Ingresso Pomeriggio'
      }
      // Se l'ingresso pomeridiano è stato fatto, ma manca l'uscita.
      if (!stato.uscitaPomeriggio) {
        return 3; // Forza lo step a 'Uscita Pomeriggio'
      }
      // Se anche le timbrature pomeridiane sono complete.
      return 4; // Giornata completata
    }

    // --- LOGICA SEQUENZIALE (per la mattina o fuori orario) ---
    // Se non è pomeriggio, il flusso segue l'ordine normale delle timbrature mancanti.
    if (!stato.entrataMattina) {
      return 0;
    }
    if (!stato.uscitaMattina) {
      return 1;
    }
    if (!stato.entrataPomeriggio) {
      return 2;
    }
    if (!stato.uscitaPomeriggio) {
      return 3;
    }

    // Tutte le timbrature sono state effettuate.
    return 4;
  }


  mostraMessaggioTemporaneo(messaggio: string) {
    this.messaggioOrarioAuto = messaggio;
    this.mostraMessaggioOrarioAuto = true;
    setTimeout(() => {
      this.mostraMessaggioOrarioAuto = false;
      this.messaggioOrarioAuto = '';
    }, 5000); // Messaggio visibile per 5 secondi
  }

  timbraStep() {
    this.timbraturaService.timbraGenerale().subscribe({
      next: (res) => {
        alert(res.message || 'Timbratura effettuata con successo.');
        if (res.success) {
          this.caricaStatoTimbrature();
        } else {
          alert('Errore: ' + res.message);
        }
      },
      error: (err) => {
        alert('Errore critico durante la timbratura: ' + err.message);
      }
    });
  }

  cliccaStraordinario() {
    this.timbraturaService.timbraStraordinario().subscribe({
      next: (res) => {
        alert(res.message);
        if (res.success) {
          this.caricaStatoTimbrature();
        }
      },
      error: (err) => {
        alert('Errore durante la timbratura straordinario: ' + err.message);
      }
    });
  }

  cliccaAssenza() {
    this.motivazioneDialog.apri();
  }

  salvaAssenza(motivazione: string) {
    this.timbraturaService.timbraAssenza(motivazione).subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message);
          this.caricaStatoTimbrature();
        }
      },
      error: (err) => {
        alert('Errore nel salvataggio dell\'assenza');
        console.error(err);
      }
    });
  }

  onMotivazioneScelta(motivazione: string | null) {
    if (motivazione) {
      this.salvaAssenza(motivazione);
    }
  }

  stepCompleted(index: number): boolean {
    switch (index) {
      case 0: return this.statoTimbratura.entrataMattina;
      case 1: return this.statoTimbratura.uscitaMattina;
      case 2: return this.statoTimbratura.entrataPomeriggio;
      case 3: return this.statoTimbratura.uscitaPomeriggio;
      default: return false;
    }
  }

  /**
   * Intercetta il tentativo di cambio step da parte dell'utente.
   * Se lo step selezionato non è quello calcolato dalla logica,
   * forza lo stepper a tornare allo step corretto.
   */
  onStepChange(event: StepperSelectionEvent) {
    if(event.selectedIndex !== this.stepCorrente) 
    {
      const nomeStepCorrente = this.stepLabels[this.stepCorrente];
      alert(`Navigazione non permessa. Completa lo step "${nomeStepCorrente}" per procedere. Ricarica la pagina!`);

      //usiamo un setTimeout per evitare problemi di change detection
      setTimeout( () => {
        this.stepper.selectedIndex = this.stepCorrente;
      });
    }

  }
}