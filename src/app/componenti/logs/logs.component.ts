import { Component, OnInit } from '@angular/core';
import { TimbraturaService } from 'src/app/services/timbratura.service';

@Component({
  selector: 'app-lista-log',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: any[] = [];

  constructor(private timbraturaService: TimbraturaService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs() {
    this.timbraturaService.getAllLogs().subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (err) => {
        console.error('Errore nel recupero dei log', err);
      }
    });
  }
}
