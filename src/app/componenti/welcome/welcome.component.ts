import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit{
  ruoloHR = false;
  isLoggedIn = false;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    this.ruoloHR = this.authService.hasRole('HR');
    
    this.authService.authStatus$.subscribe( status => {
      this.isLoggedIn = status;
    });
  }
  

}
