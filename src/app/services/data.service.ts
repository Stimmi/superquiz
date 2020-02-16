import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {



 teams: any[] = [
  {
    "tafel":"01 - Danny",
    "paswoord":"1001",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"02 - Sam",
    "paswoord":"2002",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "03 - Gio",
    "paswoord":"3003",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"04 - Jacky",
    "paswoord":"4004",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"05 - Stimmi",
    "paswoord":"5005",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"06 - Martijn",
    "paswoord":"6006",
    "score": 0,
    "tijd":0
  }
];

  
vragen: any [] = [
  {
    omschrijving: "Hoofdstad",
    antwoordSleutel: ["antananarivo"],
    foto: "../../assets/madagascar.jpg"
  },
  {
    omschrijving: "Pythagoras",
    antwoordSleutel: ["13", "dertien","13,00","13.00"],
    foto: "../../assets/pythagoras.jpg"
  },
  {
    omschrijving: "Exotisch fruit met een geurtje",
    antwoordSleutel: ["durian", "doerian", "durio", "durio zibethinus"],
    foto: "../../assets/fruit.jpg"
  },
  {
    omschrijving: "Hindenburg",
    antwoordSleutel: ["waterstof", "waterstofgas", "h"],
    foto: "../../assets/hindenburg.jpg"
  },
  {
    omschrijving: "Voornaam deelnemer",
    antwoordSleutel: ["aaron", "aron"],
    foto: "../../assets/voornaam.jpg"
  },    
  {
    omschrijving: "Vervanging KT - KNT",
    antwoordSleutel: ["kijkwijzer"],
    foto: "../../assets/richtlijn.jpg"
  },  
  {
    omschrijving: "Film Allerheiligen",
    antwoordSleutel: ["coco"],
    foto: "../../assets/film.gif"
  },  
  {
    omschrijving: "Snoep",
    antwoordSleutel: ["lange leem", "langeleemstraat","lange leemstraat"],
    foto: "../../assets/snoep.jpg"
  },  
  {
    omschrijving: "Voetbalspeler (achternaam)",
    antwoordSleutel: ["batshuayi"],
    foto: "../../assets/speler.gif"
  },
  {
    omschrijving: "Straatorkest",
    antwoordSleutel: ["meute", "muite", "muete"],
    foto: "../../assets/orkest.jpg"
  },


];

  private messageSource = new BehaviorSubject("0");
  private teamsSource = new BehaviorSubject(this.teams);
  private questionsSource = new BehaviorSubject(this.vragen);


  currentMessage = this.messageSource.asObservable();
  currentTeams = this.teamsSource.asObservable();
  currentQuestions = this.questionsSource.asObservable();



  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeTeams(teams: any[]) {
    this.teamsSource.next(teams)
  }

  changeQuestions(vragen: any[]) {
    this.questionsSource.next(vragen)
  }


}