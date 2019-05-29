import { Component, OnInit } from '@angular/core';
import {AntwoordService} from '../services/antwoord.service';
import { Anker } from '../models/antwoord';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private antwoordService: AntwoordService) { }


    ankerObj: Anker = {
      anker:0,
      invulLabel: false
    };

    huidigeVraag: number;
    gaNaarVraag: number = 0;
    ankers : Anker[] = []; 
    antwoordenMogelijk = false;


  ngOnInit() {

    this.antwoordService.getAnker().subscribe(x => this.setHuidigeVraag(x));



  }

  setHuidigeVraag(x) {


    if(x != undefined) {
      this.huidigeVraag = x.anker; 
      this.antwoordenMogelijk = x.invulLabel;
    }

  }

  setAnker(){

  this.ankerObj.anker = this.gaNaarVraag;
  this.ankerObj.invulLabel = false;

  this.antwoordService.setAnker(this.ankerObj);
  }

  setAnkerTrue(){

    this.ankerObj.invulLabel = true;
  
    this.antwoordService.setAnker(this.ankerObj);
    }



    vorigeVraag(): void {

      this.gaNaarVraag--;

  }

  volgendeVraag(): void {

    this.gaNaarVraag++;

  }



}
