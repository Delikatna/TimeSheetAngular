import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TimbraturaService } from 'src/app/services/timbratura.service';

@Component({
  selector: 'app-timbratura',
  templateUrl: './timbratura.component.html',
  styleUrls: ['./timbratura.component.css']
})
export class TimbraturaComponent implements OnInit{
 ruoloHR = false;
  
  ingressoMattinaAttivo = true;
  uscitaMattinaAttivo = false;

  ingressoPomeriggioAttivo = true;
  uscitaPomeriggioAttivo = false;

  ingressoStraordinarioAttivo = true;
  uscitaStraordinarioAttivo = false;

   assenzaAttiva = true;


  
  constructor(private timbraturaService: TimbraturaService,private authService: AuthService){}
  
  ngOnInit(): void {
  const oggi = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  const statoSalvato = localStorage.getItem('statoBottoni');

  if (statoSalvato) {
    const stato = JSON.parse(statoSalvato);

    if (stato.data === oggi) {
      // 🔁 Stesso giorno → ripristina stato salvato
      this.ingressoMattinaAttivo = stato.ingressoMattinaAttivo;
      this.uscitaMattinaAttivo = stato.uscitaMattinaAttivo;
      this.ingressoPomeriggioAttivo = stato.ingressoPomeriggioAttivo;
      this.uscitaPomeriggioAttivo = stato.uscitaPomeriggioAttivo;
      this.ingressoStraordinarioAttivo = stato.ingressoStraordinarioAttivo;
      this.uscitaStraordinarioAttivo = stato.uscitaStraordinarioAttivo;
      this.assenzaAttiva = stato.assenzaAttiva;
    } else {
      // 📅 Nuovo giorno → resetta bottoni
      this.resettaStatoBottoni();
      this.salvaStatoBottoni();
    }
  } else {
    // Nessuno stato salvato → inizializza e salva
    this.salvaStatoBottoni();
  }

  this.ruoloHR = this.authService.hasRole('HR');
}

cliccaMattina() {
  this.timbraturaService.timbraMattina().subscribe({
    next: (res) => {
      alert(res);

      if (this.ingressoMattinaAttivo) {
        this.ingressoMattinaAttivo = false;
        this.uscitaMattinaAttivo = true;
      } else {
        this.ingressoMattinaAttivo = true;
        this.uscitaMattinaAttivo = false;
      }
      this.salvaStatoBottoni();
    },
    error: () => alert('Errore durante la timbratura mattina')
  });
}

cliccaPomeriggio() {
  this.timbraturaService.timbraPomeriggio().subscribe({
    next: (res) => {
      alert(res);
      if (this.ingressoPomeriggioAttivo) {
        this.ingressoPomeriggioAttivo = false;
        this.uscitaPomeriggioAttivo = true;
      } else {
        this.ingressoPomeriggioAttivo = true;
        this.uscitaPomeriggioAttivo = false;
      }
      this.salvaStatoBottoni();
    },
    error: () => alert('Errore durante la timbratura pomeriggio')
  });
}

cliccaStraordinario() {
  this.timbraturaService.timbraStraordinario().subscribe({
    next: (res) => {
      alert(res);
      if (this.ingressoStraordinarioAttivo) {
        this.ingressoStraordinarioAttivo = false;
        this.uscitaStraordinarioAttivo = true;
      } else {
        this.ingressoStraordinarioAttivo = true;
        this.uscitaStraordinarioAttivo = false;
      }
      this.salvaStatoBottoni();
    },
    error: () => alert('Errore durante la timbratura straordinario')
  });
}



  

  cliccaAssenza() {

    this.ingressoMattinaAttivo = false;
    this.uscitaMattinaAttivo = false;

    this.ingressoPomeriggioAttivo = false;
    this.uscitaPomeriggioAttivo = false;

    this.ingressoStraordinarioAttivo = false;
    this.uscitaStraordinarioAttivo = false;

    alert('Hai segnato l\'assenza!');
    this.salvaStatoBottoni();
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
    data: new Date().toISOString().split('T')[0] // 👈 salva solo yyyy-mm-dd
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


}
