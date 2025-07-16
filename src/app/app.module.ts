import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { LoginComponent } from './componenti/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccessoNegatoComponent } from './componenti/accesso-negato/accesso-negato.component';
import { WelcomeComponent } from './componenti/welcome/welcome.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MotivazioneDialogComponent } from './componenti/motivazione/motivazione.component';
import { TimbraturaComponent } from './componenti/timbratura/timbratura.component';
import { DatiUtenteComponent } from './componenti/dati-utente/dati-utente.component';
import { ModificaUtenteComponent } from './componenti/modifica-utente/modifica-utente.component';
import { StoricoComponent } from './componenti/logs/logs.component';
import { StampaComponent } from './componenti/stampa/stampa.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrazioneComponent,
    LoginComponent,
    AccessoNegatoComponent,
    WelcomeComponent,
    MotivazioneDialogComponent,
    TimbraturaComponent,
    DatiUtenteComponent,
    ModificaUtenteComponent,
    StoricoComponent,
    StampaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
