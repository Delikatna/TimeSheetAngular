import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TimeSheetGiornalieroDto } from 'src/app/model/TimeSheetGiornalieroDto.model';
import { TimeSheetMensileDto } from 'src/app/model/TimeSheetMensileDto.model';
import { TimesheetService } from 'src/app/services/timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet-mensile.component.html',
  styleUrls: ['./timesheet-mensile.component.css']
})
export class TimesheetMensileComponent implements OnInit {
  timesheet: TimeSheetMensileDto | null = null;
  editingRowId: number | null = null;
  rowInEdit: TimeSheetGiornalieroDto | null = null;

  messaggio: string = '';
  username: string = '';
  anno: number = new Date().getFullYear();
  mese: number = new Date().getMonth() + 1;

  constructor(private timesheetService: TimesheetService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  caricaTimesheetPerUtente(): void {
    if (!this.username || !this.anno || !this.mese) {
      alert('Inserisci username, anno e mese');
      return;
    }

    this.timesheetService.getTimesheetMensile(this.username, this.anno, this.mese)
      .pipe(
        tap(data => {
          this.timesheet = data;
          console.log('Timesheet caricato:', this.timesheet);
        }),
        catchError(error => {
          console.error('Errore durante il caricamento del timesheet:', error);
          alert('Errore durante il caricamento del timesheet.');
          return of(null);
        })
      )
      .subscribe();
  }

  editRow(giorno: TimeSheetGiornalieroDto): void {
    this.editingRowId = giorno.id;
    this.rowInEdit = { ...giorno };
    this.cdr.detectChanges();
  }

  saveRow(): void {
    if (!this.rowInEdit || !this.timesheet) return;

    const { data, ...payload } = this.rowInEdit!;
    const idToUse = typeof this.rowInEdit.id === 'string' ? Number(this.rowInEdit.id) : this.rowInEdit.id;

    this.timesheetService.aggiornaRigaGiornaliera(idToUse, payload)
      .subscribe({
        next: () => {
          alert('Salvataggio avvenuto con successo');
          const index = this.timesheet!.giorni.findIndex(g => g.id === idToUse);
          if (index !== -1) {
            this.timesheet!.giorni[index] = { ...this.timesheet!.giorni[index], ...payload };
            this.timesheet!.giorni = [...this.timesheet!.giorni];
          }
          this.resetEditState();
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert('Errore nel salvataggio: ' + (err.message || err.status));
          this.resetEditState();
          this.cdr.detectChanges();
        }
      });
  }

  cancelEdit(): void {
    this.resetEditState();
    this.cdr.detectChanges();
  }

  private resetEditState(): void {
    this.editingRowId = null;
    this.rowInEdit = null;
  }

  trackById(index: number, giorno: TimeSheetGiornalieroDto): number {
    return giorno.id;
  }

  scaricaExcel(timesheetId?: number): void {
  if (timesheetId === undefined) {
    this.messaggio = 'ID del timesheet non valido';
    return;
  }

  this.timesheetService.downloadTimesheetById(timesheetId).subscribe({
    next: (blob: Blob) => {
      const nomeFile = `timesheet_${timesheetId}.xlsx`;
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
}
}

