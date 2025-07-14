import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-timbratura',
  templateUrl: './timbratura.component.html',
  styleUrls: ['./timbratura.component.css']
})
export class TimbraturaComponent implements OnInit{
 ruoloHR = false;
  
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.ruoloHR = this.authService.hasRole('HR');
  }
}
