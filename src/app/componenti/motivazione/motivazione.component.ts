import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-motivazione-dialog',
  templateUrl: './motivazione.component.html',
  styleUrls:['./motivazione.component.css']
})
export class MotivazioneDialogComponent {
  isOpen = false;

  @Output() chiuso = new EventEmitter<string | null>();

  motivazioni = [
    'Malattia',
    'Ferie',
    'Permesso'
  ];

  apri() {
    this.isOpen = true;
  }

  scegli(motivazione: string) {
    this.isOpen = false;
    this.chiuso.emit(motivazione);  // emetto la motivazione (stringa)
  }

  annulla() {
    this.isOpen = false;
    this.chiuso.emit(null);  // emetto null se annullato
  }
}
