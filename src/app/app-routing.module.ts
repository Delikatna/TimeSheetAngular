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
<<<<<<< Updated upstream
import { StoricoComponent } from './componenti/logs/logs.component';
=======
import { StampaComponent } from './componenti/stampa/stampa.component';
>>>>>>> Stashed changes

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timbratura', component: TimbraturaComponent, canActivate: [AuthGuard] },
  { path: 'registrazione', component: RegistrazioneComponent, canActivate: [AuthGuard]  },
  { path: 'accesso-negato', component: AccessoNegatoComponent },
  { path: 'logs', component: StoricoComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard]  },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'dati-utente', component: DatiUtenteComponent, canActivate: [AuthGuard] },
  { path: 'modifica-utente', component: ModificaUtenteComponent, canActivate: [AuthGuard] },
  { path: 'stampa', component: StampaComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
