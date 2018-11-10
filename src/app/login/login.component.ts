import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from "../services/data.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  geselecteerdTeam: string = "Selecteer je team"
  tafel:string;
  password;
  message:string;
  teams: any[];

  constructor(private router: Router,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
    this.data.currentTeams.subscribe(teams => this.teams = teams)


  }

  login(loginForm: NgForm): void {

    this.tafel = loginForm.value.geselecteerdTeam
    
    if(loginForm.value.password === this.teams[
      this.teams.indexOf(this.teams.find(x => x.tafel === this.tafel))].paswoord) {
      this.router.navigate(['/welkom/1'])
    } else {
      alert('Geen juiste combinatie, probeer opnieuw')
    }

    /*Ploegnummer doorgeven aan andere componenten*/
    this.data.changeMessage(this.tafel);
    localStorage.setItem("ploegNummerLoc", this.tafel);
    

  }

}
