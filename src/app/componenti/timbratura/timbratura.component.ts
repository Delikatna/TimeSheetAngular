import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TimbraturaService } from 'src/app/services/timbratura.service';
import { MotivazioneDialogComponent } from '../motivazione/motivazione.component';


@Component({
  selector: 'app-timbratura',
  templateUrl: './timbratura.component.html',
  styleUrls: ['./timbratura.component.css']
})
export class TimbraturaComponent implements OnInit {
  ruoloHR = false;

  ingressoMattinaAttivo = true;
  uscitaMattinaAttivo = false;

  ingressoPomeriggioAttivo = true;
  uscitaPomeriggioAttivo = false;

  ingressoStraordinarioAttivo = true;
  uscitaStraordinarioAttivo = false;

  assenzaAttiva = true;

  isModalOpen = false;

  @ViewChild(MotivazioneDialogComponent) motivazioneDialog!: MotivazioneDialogComponent;

  ngOnInit(): void {
    const oggi = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    const statoSalvato = localStorage.getItem('statoBottoni');

    if (statoSalvato) {
      const stato = JSON.parse(statoSalvato);

      if (stato.data === oggi) {
        this.ingressoMattinaAttivo = stato.ingressoMattinaAttivo;
        this.uscitaMattinaAttivo = stato.uscitaMattinaAttivo;
        this.ingressoPomeriggioAttivo = stato.ingressoPomeriggioAttivo;
        this.uscitaPomeriggioAttivo = stato.uscitaPomeriggioAttivo;
        this.ingressoStraordinarioAttivo = stato.ingressoStraordinarioAttivo;
        this.uscitaStraordinarioAttivo = stato.uscitaStraordinarioAttivo;
        this.assenzaAttiva = stato.assenzaAttiva;
      } else {
        this.resettaStatoBottoni();
        this.salvaStatoBottoni();
      }
    } else {
      this.salvaStatoBottoni();
    }

    this.ruoloHR = this.authService.hasRole('HR');
  }

  cliccaMattina() {
    this.timbraturaService.timbraMattina().subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message);
          if (this.ingressoMattinaAttivo) {
            this.ingressoMattinaAttivo = false;
            this.uscitaMattinaAttivo = true;
            this.salvaStatoBottoni();
          } else if (this.uscitaMattinaAttivo) {
            this.ingressoMattinaAttivo = false;
            this.uscitaMattinaAttivo = false;
          }
        } else {
          alert('Errore logico: ' + res.message);
        }
      },
      error: (err) => {
        alert('Errore durante la timbratura mattina: ' + err.message);
      }
    });
  }

  cliccaPomeriggio() {
    this.timbraturaService.timbraPomeriggio().subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message);
          if (this.ingressoPomeriggioAttivo) {
            this.ingressoPomeriggioAttivo = false;
            this.uscitaPomeriggioAttivo = true;
            this.salvaStatoBottoni();
          } else if (this.uscitaPomeriggioAttivo) {
            this.ingressoPomeriggioAttivo = false;
            this.uscitaPomeriggioAttivo = false;
          }
        } else {
          alert('Errore logico: ' + res.message);
        }
      },
      error: (err) => {
        alert('Errore durante la timbratura pomeriggio: ' + err.message);
      }
    });
  }

  cliccaStraordinario() {
    this.timbraturaService.timbraStraordinario().subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message);
          if (this.ingressoStraordinarioAttivo) {
            this.ingressoStraordinarioAttivo = false;
            this.uscitaStraordinarioAttivo = true;
            this.salvaStatoBottoni();
          } else if (this.uscitaStraordinarioAttivo) {
            this.ingressoStraordinarioAttivo = false;
            this.uscitaStraordinarioAttivo = false;
          }
        } else {
          alert('Errore logico: ' + res.message);
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

onMotivazioneScelta(motivazione: string | null) {
  this.isModalOpen = false; // chiudo il dialog
  if (motivazione) {
    alert('Hai segnato l\'assenza per motivo: ' + motivazione);

    this.timbraturaService.timbraAssenza(motivazione).subscribe({
      next: (res) => {
        if (res.success) {
          alert(res.message);

          // Disattiva i bottoni solo se la chiamata è andata a buon fine
          this.ingressoMattinaAttivo = false;
          this.uscitaMattinaAttivo = false;
          this.ingressoPomeriggioAttivo = false;
          this.uscitaPomeriggioAttivo = false;
          this.ingressoStraordinarioAttivo = false;
          this.uscitaStraordinarioAttivo = false;
          this.assenzaAttiva = true;

          this.salvaStatoBottoni();
        }
      },
      error: (err) => {
        alert('Errore nel salvataggio assenza');
        console.error(err);
      }
    });
  }
}

  salvaStatoBottoni() {
    const stato = {
      ingressoMattinaAttivo: this.ingressoMattinaAttivo,
      uscitaMattinaAttivo: this.uscitaMattinaAttivo,
      ingressoPomeriggioAttivo: this.ingressoPomeriggioAttivo,
      uscitaPomeriggioAttivo: this.uscitaPomeriggioAttivo,
      ingressoStraordinarioAttivo: this.ingressoStraordinarioAttivo,
      uscitaStraordinarioAttivo: this.uscitaStraordinarioAttivo,
      assenzaAttiva: this.assenzaAttiva,
      data: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('statoBottoni', JSON.stringify(stato));
  }

  resettaStatoBottoni() {
    this.ingressoMattinaAttivo = true;
    this.uscitaMattinaAttivo = false;

    this.ingressoPomeriggioAttivo = true;
    this.uscitaPomeriggioAttivo = false;

    this.ingressoStraordinarioAttivo = true;
    this.uscitaStraordinarioAttivo = false;

    this.assenzaAttiva = true;
  }

  constructor(
    private timbraturaService: TimbraturaService,
    private authService: AuthService
  ) {}
}
