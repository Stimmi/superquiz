import { Component, OnInit } from '@angular/core';
import { AntwoordService } from '../services/antwoord.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Antwoord, GoogleTijdstip } from '../models/antwoord';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  errorMessage: string;
  tafels;
  tafel: number;
  geefWeerLaden:boolean=false;
  antwoorden: Antwoord[] = [];
  huidigeAntwoorden: Antwoord[] = [];
  eersteAntwoord: GoogleTijdstip;


  subscription: Subscription;



  constructor(private antwoordService: AntwoordService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {

    this.subscription = this.antwoordService.getJuisteAntwoorden().subscribe(
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
    this.antwoorden.sort((a,b) => this.sorteerOpTijd(a.tijdstip,b.tijdstip));


    this.tafels.forEach(element => {
      element.score=0;
      element.tijd=0;
    });

    this.geefScore(antwoorden);


    for (let index = 1; index < 11; index++) {

      this.eersteAntwoord = null;
      this.huidigeAntwoorden = this.antwoorden.filter(element => element.vraagNr === index);
      this.huidigeAntwoorden = this.huidigeAntwoorden.filter(element => element.juist);

      if(this.huidigeAntwoorden.length > 1) {
        this.eersteAntwoord = this.huidigeAntwoorden[0].tijdstip;
        this.berekenTijd(this.huidigeAntwoorden, this.eersteAntwoord);
      }


    }

    this.tafels.sort((a,b) => this.sortScoreTijd(a,b));

  }

  sortScoreTijd(a, b) {
    var Item1 = a.score;
    var Item2 = b.score;
    if(Item1 != Item2){
        return (Item2 - Item1);
    }
    else{
        return (a.tijd - b.tijd);
    }
  }

  sorteerOpTijd(a,b) {

    return (a.seconds*1000+a.nanoseconds/1000000) - (b.seconds*1000+b.nanoseconds/1000000);

  }

  geefScore(antwoorden) {

    antwoorden.forEach(element => {
      this.tafel = this.tafels.indexOf(this.tafels.find(x => x.tafel === element.tafel));
      if(this.tafel >= 0) {
        this.tafels[this.tafel].score = this.tafels[this.tafel].score + 1;
      }
      
    });

  }

  berekenTijd(antworden, eersteAntwo) {

    antworden.forEach(element => {
      this.tafel = this.tafels.indexOf(this.tafels.find(x => x.tafel === element.tafel));
      if(this.tafel >= 0) {
        this.tafels[this.tafel].tijd = this.tafels[this.tafel].tijd + (((element.tijdstip.seconds*1000)+(element.tijdstip.nanoseconds/1000000)) - ((eersteAntwo.seconds*1000)+(eersteAntwo.nanoseconds/1000000)));
      }
      
    });

  }




  naarScore(){

    this.router.navigate(['/welkom/'])
    this.subscription.unsubscribe();

}



}
