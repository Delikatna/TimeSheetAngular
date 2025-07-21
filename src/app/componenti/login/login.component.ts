import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/dto/auth-request-dto';
import { StorageKeys } from 'src/app/model/StorageKey.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: AuthRequest = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  this.authService.login(this.loginData).subscribe({
    next: () => {
      this.errorMessage = null;
      this.router.navigate(['/timbratura']);
    },
    error: (err) => {
      this.errorMessage = err.error?.error || 'Errore di login';
    }
  });
}
}

