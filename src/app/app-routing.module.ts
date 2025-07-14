import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { LoginComponent } from './componenti/login/login.component';
import { TimbraturaComponent } from './componenti/timbratura/timbratura.component';
import { AccessoNegatoComponent } from './componenti/accesso-negato/accesso-negato.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './componenti/welcome/welcome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timbratura', component: TimbraturaComponent, canActivate: [AuthGuard]  },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'accesso-negato', component: AccessoNegatoComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
