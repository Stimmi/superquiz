import { Component, OnInit, OnDestroy } from '@angular/core';
import { AntwoordService } from '../services/antwoord.service';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Anker, GoogleTijdstip, Antwoord } from '../models/antwoord';


@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit, OnDestroy {

  subscriptionAnker: Subscription;
  subscriptionAntwoorden: Subscription; 
  anker: Anker;
  errorMessage: string;
  vraagNummer: number;
  antwoordHTML: string;
  imagePath: string;
  shaker: boolean= true;
  questions: any[];
  subscriptionQuestions: Subscription;
  geefWeerLaden:boolean=false;
  vraag: string;
  antwoorden: Antwoord[] = [];
  antwoordenHuigeVraag: Antwoord[] = [];
  tijdstipG1: GoogleTijdstip;
  tijdstipG2: GoogleTijdstip;
  eersteAntw: number;




  constructor(private antwoordService: AntwoordService,
    private data: DataService,
    private router:  Router) { }

  ngOnInit() {

    this.subscriptionAnker = this.antwoordService.getAnker().subscribe(x => this.vraagWisselaar(x));
    this.subscriptionQuestions = this.data.currentQuestions.subscribe(y => this.setQuestions(y));

  }

  ngOnDestroy() {

    this.subscriptionAntwoorden.unsubscribe();
    this.subscriptionAnker.unsubscribe();
    this.subscriptionQuestions.unsubscribe();


  }

  vraagWisselaar(x){

    this.anker = x;


    if (this.anker.anker > 0 && this.anker.anker < 11) {

      this.laadVraag(this.anker.anker)

    } else if (this.anker.anker === 11) {

      this.router.navigate(['/score']);

  } else {
    this.router.navigate(['/welkom']);

  }

  if(this.subscriptionAntwoorden) {
    this.subscriptionAntwoorden.unsubscribe();
  }


  this.subscriptionAntwoorden = this.antwoordService.getAntwoordenVraagNr(this.anker.anker)
        .subscribe(
          antwoorden => { this.antwoordVerwerker(antwoorden) 
          },
          error => this.errorMessage = <any>error
        );

}

laadVraag(vraagnr){

  this.geefWeerLaden=true;
  this.antwoordHTML = null;


  this.vraagNummer = vraagnr;
  this.vraag = this.questions[this.vraagNummer-1].omschrijving;
  this.imagePath = this.questions[this.vraagNummer-1].foto;
  /*this.antwoordVerwerker(this.antwoorden);*/

  this.shaker = true;
      setTimeout(() => this.shaker = false, 820);

}

antwoordVerwerker(antwoorden): void {

  this.antwoorden = antwoorden;

  this.antwoordenHuigeVraag = this.antwoorden.filter(a => a.tijdstip);

   
   this.antwoordenHuigeVraag.sort((a,b) => this.sorteerOpJuistTijd(a,b,a.tijdstip,b.tijdstip));


  if(this.antwoordenHuigeVraag.length > 0) {
    if(this.antwoordenHuigeVraag[0].tijdstip) {
      this.eersteAntw = this.antwoordenHuigeVraag[0].tijdstip;
    }

  }

}


sorteerOpJuistTijd(a, b, c,d) {
  var Item1 = a.juist;
  var Item2 = b.juist;
  if(Item1 != Item2){
      return (Item2 - Item1);
  }
  else{
    this.tijdstipG1 = c;
    this.tijdstipG2 = d;

      return ((this.tijdstipG1.seconds*1000+this.tijdstipG1.nanoseconds/1000000) - (this.tijdstipG2.seconds*1000+this.tijdstipG2.nanoseconds/1000000));
  }
}


naarScore(){

    this.router.navigate(['/score'])

}

setQuestions(y) {

  this.questions = y;

}




}
