import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
  ruoloHR = false;
  
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.ruoloHR = this.authService.hasRole('HR');
  }
  
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // questo deve restituire true/false
  }

}
