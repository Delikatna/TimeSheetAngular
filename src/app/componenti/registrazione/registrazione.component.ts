import { Component } from '@angular/core';
import { RegistrazioneDto } from 'src/app/dto/registrazione-dto';
import { AuthService } from 'src/app/services/auth.service';
 
 
@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
 
 
})
export class RegistrazioneComponent {
  registrazioneData: RegistrazioneDto = {
    utente: {
      username: '',
      password: '',
      email: '',
      ruolo: 'USER'
    },
    anagraficaUtente: {
      nome: '',
      cognome: '',
      sede: '',
      numTelefono: '',
      dob: new Date(),
      mansione: 'SVILUPPATORE'
    }
  };
 
  constructor(private authService: AuthService) {}
 
  onSubmit() {
    this.authService.register(this.registrazioneData).subscribe({
      next: res => alert('Registrazione avvenuta con successo'),
      error: err => alert('Errore: ' + err.error?.error || err.message)
    });
  }
}