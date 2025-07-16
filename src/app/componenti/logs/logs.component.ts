import { Component, OnInit } from '@angular/core';
import { StoricoTimbrature } from 'src/app/model/storico-timbrature';
import { StoricoService } from 'src/app/services/storico.service';

@Component({
  selector: 'app-storico',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class StoricoComponent implements OnInit {

  storico: StoricoTimbrature[] = [];
  paginaCorrente = 0;
  dimensionePagina = 7;
  totalePagine = 0;

  constructor(private storicoService: StoricoService) {}

  dataFiltro: string = '';

ngOnInit(): void {
  const oggi = new Date();
  const giorno = oggi.getDate().toString().padStart(2, '0');
  const mese = (oggi.getMonth() + 1).toString().padStart(2, '0');
  const anno = oggi.getFullYear();
  this.dataFiltro = `${giorno}/${mese}/${anno}`;

  this.caricaStorico();
}

  /**
   * Converte la data da 'yyyy-MM-dd' a 'dd/MM/yyyy'
   */
  formattaData(dataISO: string): string {
    const parts = dataISO.split('-'); // ["yyyy", "MM", "dd"]
    if (parts.length !== 3) return dataISO;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  caricaStorico() {
    const dataFormattata = this.formattaData(this.dataFiltro);
    this.storicoService.getStoricoPerGiorno(dataFormattata, this.paginaCorrente, this.dimensionePagina)
      .subscribe(page => {
        this.storico = page.content;
        this.totalePagine = page.totalPages;
        console.log(this.storico);
      });
  }

  paginaPrecedente() {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.caricaStorico();
    }
  }

  paginaSuccessiva() {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.caricaStorico();
    }
  }

  cambiaData(event: any) {
  const date = new Date(event.target.value);
  const giorno = date.getDate().toString().padStart(2, '0');
  const mese = (date.getMonth() + 1).toString().padStart(2, '0');
  const anno = date.getFullYear();
  this.dataFiltro = `${giorno}/${mese}/${anno}`;
  this.paginaCorrente = 0;
  this.caricaStorico();
}
}
