import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Antwoord, Anker } from '../models/antwoord';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Injectable()
export class AntwoordService {

  antwoordCollection: AngularFirestoreCollection<Antwoord>;
  antwoorden: Observable<Antwoord[]>;
  ankerCollection: AngularFirestoreDocument<Anker>;
  ankerPunt: Observable<Anker>;
  tafelRef: string;
  tijdstip: any;


  constructor(private afs: AngularFirestore) {

   }

   getAntwoorden() {
    /*this.antwoordCollection =  this.afs.collection('antwoorden');
    return this.antwoorden = this.antwoordCollection.valueChanges();*/

    this.antwoordCollection =  this.afs.collection('antwoorden', antw => {
      return antw.orderBy('tijdstip');
    });
    return this.antwoorden = this.antwoordCollection.valueChanges();

    
  }

  setAntwoord(antwoord) {

    this.tafelRef = antwoord.tafel.substring(0,2);

    if (antwoord.juist) {
      this.tijdstip = firebase.firestore.FieldValue.serverTimestamp();
    }
    else {
      this.tijdstip = 1;
    }

    antwoord.tijdstip = this.tijdstip;


    this.afs.collection('antwoorden').doc(antwoord.vraagNr+this.tafelRef).ref.get().then(
      (doc) => {
              if (!doc.exists) {
                this.afs.collection('antwoorden').doc(antwoord.vraagNr+this.tafelRef).set(antwoord);
        }
      }
    )

  }

  getAntwoordenVraagNr(vraagNr) {


      
    this.antwoordCollection =  this.afs.collection('antwoorden', antw => {
      return antw.where('vraagNr', '==', vraagNr);
    });
    return this.antwoorden = this.antwoordCollection.valueChanges();

  }



  getJuisteAntwoorden() {

      
    this.antwoordCollection =  this.afs.collection('antwoorden', antw => {
      return antw.where('juist', '==', true)
    });
    return this.antwoorden = this.antwoordCollection.valueChanges();
  }

  getAnker(){
    this.ankerCollection = this.afs.collection('anker').doc('ankerID');
    return this.ankerPunt = this.ankerCollection.valueChanges();
  }


  setAnker(anker) {

    this.afs.collection('anker').doc('ankerID').set(anker);
    
  }



}
