import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {



 teams: any[] = [
  {
    "tafel":"01 - (Z)wijntjes",
    "paswoord":"1001",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"02 - De Knikkers",
    "paswoord":"2002",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "03 - De Paarse Eikels",
    "paswoord":"3003",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"04 - Familie Jansen",
    "paswoord":"4004",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"05 - Kloostoedebar",
    "paswoord":"5005",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"06 - De vrienden van Anita",
    "paswoord":"6006",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"07 - De vrienden van Georges",
    "paswoord":"7007",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "08 - Nadagetzegt",
    "paswoord":"8008",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "09 - Hulpkas van de Onwetenden",
    "paswoord":"9009",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "10 - Veel Toog",
    "paswoord":"0110",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "11 - De Vakantie Vriendjes",
    "paswoord":"1111",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "12 - De Soixanteneufkes",
    "paswoord":"2112",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"13 - Team Ronny Smeets & Vrienden",
    "paswoord":"3113",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"14 - De Vriendinnen van de Jury",
    "paswoord":"4114",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "15 - Team Kwistetwel",
    "paswoord":"5115",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"16 - Les Kwiserables",
    "paswoord":"6116",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"17 - Roestende Rhinoceros",
    "paswoord":"7117",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"18 - Mokka",
    "paswoord":"8118",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "19 - Oost-Afrikaantjes",
    "paswoord":"9119",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "20 - West-Afrikaantjes",
    "paswoord":"0220",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "21 - Kwistet",
    "paswoord":"1221",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "22 - Bierennegentig",
    "paswoord":"2222",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "23 - Golden Brain warriors",
    "paswoord":"3223",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"24 - Canas",
    "paswoord":"4224",
    "score": 0,
    "tijd":0
  },
  {
    "tafel":"25 - Team M",
    "paswoord":"5225",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "26 - Paal",
    "paswoord":"6226",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "27 - Oh Danish Friends",
    "paswoord":"7227",
    "score": 0,
    "tijd":0
  },
  {
    "tafel": "28 - Jack Blockx",
    "paswoord":"8228",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "29 - The Slimpsons",
    "paswoord":"9229",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "30 - Stefan & Kwistel",
    "paswoord":"0330",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "31 - Superkiss",
    "paswoord":"1331",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "32 - Pretty and Smart",
    "paswoord":"2332",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "33 - Wie nog bier?",
    "paswoord":"3333",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "34 - 79",
    "paswoord":"4334",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "35 - Barones Schraeder fanclub",
    "paswoord":"5335",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "36 - Team Seujve",
    "paswoord":"6336",
    "score": 0,
    "tijd":0
  }
  ,
  {
    "tafel": "37 - Team K",
    "paswoord":"7337",
    "score": 0,
    "tijd":0
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