import { Component, OnInit } from '@angular/core';
import { AntwoordService } from '../services/antwoord.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Antwoord } from '../models/antwoord';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  errorMessage: string;
  tafels;
  tafel: string;
  geefWeerLaden:boolean=false;
  antwoorden: Antwoord[] = [];


  constructor(private antwoordService: AntwoordService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {

    this.antwoordService.getJuisteAntwoorden().subscribe(
      antwoorden => {
        this.scoreVerwerker(antwoorden);
      },
      error => this.errorMessage = <any>error
    );

    this.dataService.currentTeams.subscribe(tafels => this.tafels = tafels);

  }

  scoreVerwerker(antwoorden){

    this.antwoorden = [];
    this.antwoorden = antwoorden;


    this.tafels.forEach(element => {
      element.score=0;
    });

    antwoorden.forEach(element => {
      this.tafel = this.tafels.indexOf(this.tafels.find(x => x.tafel === element.tafel));

      this.tafels[this.tafel].score = this.tafels[this.tafel].score + 1;
    });


    this.tafels.sort((a,b) => b.score - a.score);

  }


  naarScore(){

    this.router.navigate(['/welkom/1'])

}



}
