import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/dto/auth-request-dto';

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
    next: (response) => {
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('username', response.username);
      localStorage.setItem('role', response.role);
      localStorage.setItem('idUser', response.idUser.toString());

      this.errorMessage = null;
      this.router.navigate(['/timbratura']);  // redirect al componente timbratura
    },
    error: (err) => {
      this.errorMessage = err.error || 'Errore di login';
    }
  });
}
}

