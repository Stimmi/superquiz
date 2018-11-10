import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AntwoordService} from '../services/antwoord.service';
import { DataService } from '../services/data.service';
import {NgForm} from '@angular/forms';
import { Antwoord } from '../models/antwoord';


@Component({
  templateUrl: './vragen-detail.component.html',
  styleUrls: ['./vragen-detail.component.css']
})
export class VragenDetailComponent implements OnInit {
  vraagNummer;
  message:string;
  errorMessage;
  eersteAntw;
  antwoordFormatted: string;
  vraag: string;
  imagePath: string;
  geefWeerForm: boolean= true;
  geefWeerOntv: boolean= true;
  geefWeerLaden:boolean=false;
  geefWeerPijl: boolean= true;
  shaker: boolean= true;

  antwoorden: Antwoord[] = [];
  antwoord: Antwoord = {
    antwoord: '',
    vraagNr:0,
    tafel: '',
    tijdstip: 0,
    juist: false,
  };

  antwoordHTML: string;

  constructor(private route: ActivatedRoute,
    private antwoordService: AntwoordService,
    private data: DataService,
    private router:  Router) { }

  ngOnInit() {

    this.route.params.subscribe(
      params => { 

        this.vraagNummer = this.route.snapshot.paramMap.get('vraagNummer');

        this.data.currentMessage
        .subscribe(message => this.message = message)
        this.checkPloegNummer(this.message);
    
        this.antwoordService.getAntwoordenVraagNr(this.vraagNummer)
        .subscribe(
          antwoorden => { if (antwoorden.length > 0 && antwoorden[0].vraagNr  === this.vraagNummer){
            this.antwoordVerwerker(antwoorden);
          }
          },
          error => this.errorMessage = <any>error
        );

        this.vraag = this.vragen[this.vraagNummer-1].omschrijving;
        this.imagePath = this.vragen[this.vraagNummer-1].foto;
        this.geefWeerPijl = true;

        this.geefWeerOntv = true;
        this.geefWeerForm = false;
        this.geefWeerLaden=true;
        this.antwoorden = [];

        this.shaker = true;
        setTimeout(() => this.shaker = false, 820);
      }
    );

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
      this.antwoord.tijdstip = Date.now();
  
      this.checkAntwoord(antwoordForm.value.antwoordHTML);
  
      this.antwoordService.setAntwoord(this.antwoord);
  
      this.antwoordHTML = '';


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

    this.antwoorden = [];
    this.antwoorden = antwoorden;

    if (this.antwoorden.find(a => a.tafel === this.message)) {
      this.geefWeerOntv = false;
      this.geefWeerForm = true;
      this.geefWeerLaden=true;

    } else {
      this.geefWeerOntv = true;
      this.geefWeerForm = false;
      this.geefWeerLaden=true;
    }


     this.antwoorden.sort((a,b) => a.tijdstip - b.tijdstip).sort((x,y) => (x.juist === y.juist)? 0 : x.juist? -1 : 1);
  

    if(this.antwoorden.length > 0) {
      this.eersteAntw = this.antwoorden[0].tijdstip;
    }


  }





  vorigeVraag(): void {

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


  }


  naarScore(){

      this.router.navigate(['/score'])

  }


  vragen = [
    {
      omschrijving: "Voetbalcompetitie",
      antwoordSleutel: ["super league", "superleague"],
      foto: "../../assets/voetbal.jpg"
    },
    {
      omschrijving: "In welke gemeente hebben Fotis en Stimmi een huis gekocht?",
      antwoordSleutel: ["boechout", "2530", "boechout"],
      foto: "../../assets/IMG-20181031-WA0001.jpg"
    },
    {
      omschrijving: "Japanse term",
      antwoordSleutel: ["ikebana"]
    },
    {
      omschrijving: "Turnkampioene",
      antwoordSleutel: ["derwael", "der wael", "derwaal", "der waal", "nina der wael", "nina der waal", "nina derwaal"],
      foto: "../../assets/ee34f7c0-278c-11e7-858b-4c3c39bb4217_original.jpg"
    },
    {
      omschrijving: "Vergeten groente",
      antwoordSleutel: ["romanesco", "romanesko", "fractoli", "torentjesbloemkool"],
      foto: "../../assets/Romanesco-9-S-D-v-san1-698.jpg"

    },
    {
      omschrijving: "Televisieserie",
      antwoordSleutel: ["gloria"],
      foto: "../../assets/200w.gif"
    },
    {
      omschrijving: "Van welke club is Philippe Clement de trainer?",
      antwoordSleutel: ["genk", "koninklijke racing club genk", "krc genk"]
    },
    {
      omschrijving: "In welk jaar werd Koning Filip gekroond?",
      antwoordSleutel: ["2013"]
    },
    {
      omschrijving: "Hoe heeft het gevleugelde paard uit de Griekse Mythologie",
      antwoordSleutel: ["pegasus","pegasos","pegaas"]
    },
    {
      omschrijving: "Wie won de vrouwenderby voetbal van Mortsel op 19/09?",
      antwoordSleutel: ["fc monas", "monas","monas fc", "de monas"]
    }
  ];
  


}
