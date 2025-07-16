import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TimbraturaService } from 'src/app/services/timbratura.service';
import { MotivazioneDialogComponent } from '../motivazione/motivazione.component';
import { StatoTimbratura } from 'src/app/model/stato-timbratura.model';


@Component({
  selector: 'app-timbratura',
  templateUrl: './timbratura.component.html',
  styleUrls: ['./timbratura.component.css']
})
export class TimbraturaComponent implements OnInit {
  ruoloHR = false;

  statoTimbratura: StatoTimbratura = {
    entrataMattina: false,
    uscitaMattina: false,
    entrataPomeriggio: false,
    uscitaPomeriggio: false,
    entrataStraordinario: false,
    uscitaStraordinario: false,
    assenzaSegnata : false
  };

  isModalOpen = false;

  @ViewChild(MotivazioneDialogComponent) motivazioneDialog!: MotivazioneDialogComponent;

  constructor(
    private timbraturaService: TimbraturaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const oggi = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    this.ruoloHR = this.authService.hasRole('HR');
    this.caricaStatoTimbrature();
  }

  caricaStatoTimbrature() {
    this.timbraturaService.getStatoTimbratura().subscribe({
      next: (stato) => {
        this.statoTimbratura = stato;
      },
      error: (err) => {
        console.error('Errore caricamento stato timbrature', err);
      }
    });
  }


cliccaMattina() {
  this.timbraturaService.timbraMattina().subscribe({
    next: (res) => {
      alert(res.message || JSON.stringify(res));
      if (res.success) {

        this.caricaStatoTimbrature();
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
      alert(res.message);
      if (res.success) {
        this.caricaStatoTimbrature();
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
      alert(res.message);
      if (res.success) {
        this.caricaStatoTimbrature();
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

salvaAssenza(motivazione: string) {
  this.timbraturaService.timbraAssenza(motivazione).subscribe({
    next: (res) => {
      if (res.success) {
        alert(res.message);
        this.caricaStatoTimbrature();
      }
    },
    error: (err) => {
      alert('Errore nel salvataggio assenza');
      console.error(err);
    }
  });
}

onMotivazioneScelta(motivazione: string | null) {
  if (motivazione) {
    this.salvaAssenza(motivazione);
  }
}
  
}
