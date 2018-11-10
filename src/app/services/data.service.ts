import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  teams: any[] = [
    {
      "tafel":"1 - Danny",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel":"2 - Makke",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel": "3 - Kasper",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel":"4 - Stimmi",
      "paswoord":"4667",
      "score": 0
    },
    {
      "tafel":"5 - Sam",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel":"6 - Gio",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel":"7 - Tom",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel": "8 - Martijn",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel": "9 - Jacky",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel": "10 - Fotis",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel": "11 - Tafel 11",
      "paswoord":"9999",
      "score": 0
    },
    {
      "tafel": "12 - Tafel 12",
      "paswoord":"9999",
      "score": 0
    }
  ];
  

  private messageSource = new BehaviorSubject("0");
  private teamsSource = new BehaviorSubject(this.teams);

  currentMessage = this.messageSource.asObservable();
  currentTeams = this.teamsSource.asObservable();


  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeTeams(teams: any[]) {
    this.teamsSource.next(teams)
  }



}