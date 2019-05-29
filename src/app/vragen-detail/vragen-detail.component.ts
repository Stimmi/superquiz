import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {AntwoordService} from '../services/antwoord.service';
import { DataService } from '../services/data.service';
import {NgForm} from '@angular/forms';
import { Antwoord, Anker, GoogleTijdstip } from '../models/antwoord';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './vragen-detail.component.html',
  styleUrls: ['./vragen-detail.component.css']
})
export class VragenDetailComponent implements OnInit, OnDestroy {
  vraagNummer: number;
  message:string;
  errorMessage: string;
  eersteAntw: number;
  antwoordFormatted: string;
  vraag: string;
  imagePath: string;
  geefWeerForm: boolean= true;
  geefWeerOntv: boolean= true;
  geefWeerLaden:boolean=false;
  /*geefWeerPijl: boolean= true;*/
  shaker: boolean= true;
  anker: Anker;
  subscriptionAnker: Subscription;
  subscriptionAntwoorden: Subscription;
  antwoordHTML: string;
  antwoorden: Antwoord[] = [];
  antwoordenHuigeVraag: Antwoord[] = [];
  tijdstipG1: GoogleTijdstip;
  tijdstipG2: GoogleTijdstip;






  antwoord: Antwoord = {
    antwoord: '',
    vraagNr:0,
    tafel: '',
    tijdstip: 0,
    juist: false,
  };


  constructor(private antwoordService: AntwoordService,
    private data: DataService,
    private router:  Router) { }

  ngOnDestroy() {

    this.subscriptionAnker.unsubscribe();
    this.subscriptionAntwoorden.unsubscribe();

  }

  ngOnInit() {

  /*this.subscriptionAntwoorden = this.antwoordService.getAntwoorden()
        .subscribe(
          antwoorden => { this.antwoordVerwerker(antwoorden) 
          },
          error => this.errorMessage = <any>error
        );*/

    

  this.subscriptionAnker = this.antwoordService.getAnker().subscribe(x => this.vraagWisselaar(x));

  this.data.currentMessage
  .subscribe(message => this.message = message)
  this.checkPloegNummer(this.message);



  }

  vraagWisselaar(x){

    this.anker = x;


    if (this.anker.invulLabel === false) {
      this.geefWeerForm = true;

    } else  {
      this.geefWeerForm = false;

    }


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
    this.vraag = this.vragen[this.vraagNummer-1].omschrijving;
    this.imagePath = this.vragen[this.vraagNummer-1].foto;
    /*this.antwoordVerwerker(this.antwoorden);*/

    this.shaker = true;
        setTimeout(() => this.shaker = false, 820);

  }


  checkPloegNummer (message) {
    if (message === "0" || this.message === null || this.message === undefined) {
      this.data.changeMessage(localStorage.ploegNummerLoc);
      if (this.message === "0" || this.message === null || this.message === undefined){
        this.router.navigate(['/login'])
      }
    }
  }

  antwoordFunctie(antwoordForm: NgForm): void {


    if(antwoordForm.value.antwoordHTML === undefined || antwoordForm.value.antwoordHTML.length === 0) {

      console.log("Geef een langer antwoord")
      
    } else {

      this.antwoord.antwoord = antwoordForm.value.antwoordHTML;
      this.antwoord.vraagNr = this.vraagNummer;
      this.antwoord.tafel = this.message;
  
      this.checkAntwoord(antwoordForm.value.antwoordHTML);
  
      this.antwoordService.setAntwoord(this.antwoord);
  
      this.antwoordHTML = '';

      /*this.geefWeerOntv = false;
      this.geefWeerForm = true;*/


    }


  }

  checkAntwoord(antwoord): void {

    this.antwoord.juist = false;

    this.antwoordFormatted = antwoord.toString().toLowerCase().trim();


    if(this.vragen[this.vraagNummer-1].antwoordSleutel.includes(this.antwoordFormatted)){
      this.antwoord.juist = true;
    };

    if(this.antwoordFormatted.includes(this.vragen[this.vraagNummer-1].antwoordSleutel[0])) {
      this.antwoord.juist = true;
    };


  }


  antwoordVerwerker(antwoorden): void {

    this.antwoorden = antwoorden;

    this.antwoordenHuigeVraag = this.antwoorden.filter(a => a.tijdstip);

    if (this.antwoordenHuigeVraag.some(item => item.tafel === this.message)) {
      this.geefWeerOntv = false;
      this.geefWeerForm = true;

    } else {
      this.geefWeerOntv = true;
    }

     
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

    /*vorigeVraag(): void {

    this.geefWeerPijl = false;

    if(parseInt(this.vraagNummer) === 1) {
      this.router.navigate(['/welkom/', 10])
    } else {
      this.router.navigate(['/welkom/', parseInt(this.vraagNummer)-1])
    }

  }

  volgendeVraag(): void {

    this.geefWeerPijl = false;


    if(parseInt(this.vraagNummer) === 10) {
      this.router.navigate(['/welkom/', 1])
    } else {
      this.router.navigate(['/welkom/', parseInt(this.vraagNummer)+1])
    }


  }*/


  
  vragen = [
    {
      omschrijving: "Gele hesjes",
      antwoordSleutel: ["gilets jaunes", "les gilets jaunes"],
      foto: "../../assets/geel.JPG"
    },
    {
      omschrijving: "Google Translate",
      antwoordSleutel: ["chingrish", "chinglish"],
      foto: "../../assets/truth.JPG"
    },
    {
      omschrijving: "Japanse term",
      antwoordSleutel: ["ikebana"],
      foto: "../../assets/ikebana.JPG"
    },
    {
      omschrijving: "Elfstedentocht",
      antwoordSleutel: ["97", "1997", "zevenennegentig","negentienzevenennegentig"],
      foto: "../../assets/steden.JPG"
    },
    {
      omschrijving: "Bijzondere groente",
      antwoordSleutel: ["romanesco", "romanesko", "fractoli", "torentjesbloemkool"],
      foto: "../../assets/Romanesco-9-S-D-v-san1-698.jpg"

    },
    {
      omschrijving: "Naam personage",
      antwoordSleutel: ["herman"],
      foto: "../../assets/herman.JPG"
    },
    {
      omschrijving: "Videospel",
      antwoordSleutel: ["empires", "age of empires", "age of empires ii"],
      foto: "../../assets/aoe.JPG"
    },
    {
      omschrijving: "Magische steen",
      antwoordSleutel: ["tesseract", "hyperkubus", "infinity stone","infinity gem","infinity stones","infinity gems","tesserakt"],
      foto: "../../assets/loki.JPG"

    },
    {
      omschrijving: "Oercontinent",
      antwoordSleutel: ["pangea","pangaea"],
      foto: "../../assets/cont.JPG"

    },
    {
      omschrijving: "Rage op de speelplaats",
      antwoordSleutel: ["loom", "loem","loem bandjes", "loom bandjes"],
      foto: "../../assets/loom.JPG"
    }
  ];



}
