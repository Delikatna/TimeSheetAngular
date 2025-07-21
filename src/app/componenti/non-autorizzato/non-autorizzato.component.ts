import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accesso-non-autorizzato',
  templateUrl: './non-autorizzato.component.html',
  styleUrls: ['./non-autorizzato.component.css']
})
export class AccessoNonAutorizzatoComponent {

  constructor(private router: Router) {}

  tornaIndietro() {
    this.router.navigate(['/welcome']);
  }
}
