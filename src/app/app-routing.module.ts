import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { LoginComponent } from './componenti/login/login.component';
import { TimbraturaComponent } from './componenti/timbratura/timbratura.component';
import { AccessoNegatoComponent } from './componenti/accesso-negato/accesso-negato.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './componenti/welcome/welcome.component';
import { DatiUtenteComponent } from './componenti/dati-utente/dati-utente.component';
import { ModificaUtenteComponent } from './componenti/modifica-utente/modifica-utente.component';
import { StoricoComponent } from './componenti/logs/logs.component';
import { StampaComponent } from './componenti/stampa/stampa.component';
import { CommonModule } from '@angular/common'; // <-- 1. IMPORTA QUI
import { TimesheetMensileComponent } from './componenti/timesheet-mensile/timesheet-mensile.component';
import { AssenzaComponent } from './componenti/assenza/assenza.component';
import { AccessoNonAutorizzatoComponent } from './componenti/non-autorizzato/non-autorizzato.component';
import { PaginaNonTrovataComponent } from './componenti/pagina-non-trovata/pagina-non-trovata.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timbratura', component: TimbraturaComponent, canActivate: [AuthGuard] },
  { path: 'registrazione', component: RegistrazioneComponent, canActivate: [AuthGuard], data: { ruoli: ['HR'] }  },
  { path: 'accesso-negato', component: AccessoNegatoComponent },
  { path: 'logs', component: StoricoComponent, canActivate: [AuthGuard], data: { ruoli: ['HR'] } },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'modifica-timesheet', component: TimesheetMensileComponent , canActivate: [AuthGuard], data: { ruoli: ['HR'] } },
  { path: 'dati-utente', component: DatiUtenteComponent, canActivate: [AuthGuard] },
  { path: 'modifica-utente', component: ModificaUtenteComponent, canActivate: [AuthGuard], data: { ruoli: ['HR'] } },
  { path: 'motivi-assenza', component: AssenzaComponent, canActivate: [AuthGuard] },
  { path: 'stampa', component: StampaComponent, canActivate: [AuthGuard] },
  { path: 'accesso-non-autorizzato', component: AccessoNonAutorizzatoComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**',component:PaginaNonTrovataComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
