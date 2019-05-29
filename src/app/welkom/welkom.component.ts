import { Component, OnInit, OnDestroy } from '@angular/core';
import { AntwoordService } from "../services/antwoord.service";
import { Anker } from '../models/antwoord';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  templateUrl: './welkom.component.html',
  styleUrls: ['./welkom.component.css']
})
export class WelkomComponent implements OnInit, OnDestroy {


  foto: number;
  omgekeerd: boolean;
  afbeeldingen: any[] = new Array;
  geklikteIMG: string;
  ankers : Anker; 
  omgekeerdeIMGS: number[]= new Array;
  intervalID: any;
  geklikteBol: number;
  subscription: Subscription;
  huidigeTijd: number = Date.now();



  constructor(private antwoordService: AntwoordService,
    private router: Router) { }

  ngOnDestroy() {

    clearInterval(this.intervalID);

    this.subscription.unsubscribe();

  }

  ngOnInit() {

    for (var i = 0; i < 9; i++) {
    this.afbeeldingen[i]= new this.Afbeelding();
    }

    this.intervalID = setInterval(() => this.startAnimatie() , 2500);

    this.subscription = this.antwoordService.getAnker().subscribe(x => this.huidgeVraagOpvuller(x));
  }

  klikIMG(event: any){
    this.geklikteIMG = event.target.src;
    this.geklikteIMG = this.geklikteIMG.substr(this.geklikteIMG.length-5, 1);
    this.geklikteBol = parseInt(event.target.id);

    this.afbeeldingen.forEach(x => x.foto = parseInt(this.geklikteIMG));


    if(this.omgekeerdeIMGS.includes(this.geklikteBol)){
      this.omgekeerdeIMGS.splice(this.omgekeerdeIMGS.indexOf(this.geklikteBol),1)

    } else {
      this.omgekeerdeIMGS.push(this.geklikteBol);

    }


    for (var i=0; i< this.afbeeldingen.length; i++) {

      if(this.omgekeerdeIMGS.includes(i)) {
        
        this.afbeeldingen[i].omgekeerd = true;
      } else {
        this.afbeeldingen[i].omgekeerd = false;

      }
    }

  }

  Afbeelding(){
    this.foto = Math.floor(Math.random()*3+1),
    this.omgekeerd= false;
    
  }



  startAnimatie(){
    this.afbeeldingen.forEach(element => {element.foto = Math.floor(Math.random()*3+1)});

  }

  huidgeVraagOpvuller(x) {

    this.ankers = x;

     if(this.ankers.anker > 0 && this.ankers.anker < 11) {
      this.router.navigate(['/vragen/']);

    } else if (this.ankers.anker === 11){
      this.router.navigate(['/score/'])

    } else {

      this.router.navigate(['/welkom/']);

    }

  }


}
