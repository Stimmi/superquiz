import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Antwoord } from '../models/antwoord';
import { Observable } from 'rxjs';


@Injectable()
export class AntwoordService {

  antwoordCollection: AngularFirestoreCollection<Antwoord>;
  antwoorden: Observable<Antwoord[]>;


  constructor(private afs: AngularFirestore) {


   }

   getAntwoorden() {
    return this.afs.collection('antwoorden').valueChanges();
  }

  setAntwoord(antwoord) {

    this.afs.collection('antwoorden').doc(antwoord.vraagNr+antwoord.tafel).ref.get().then(
      (doc) => {
              if (!doc.exists) {
                this.afs.collection('antwoorden').doc(antwoord.vraagNr+antwoord.tafel).set(antwoord);
        }
      }
    )

  }

  getAntwoordenVraagNr(vraagNr) {

      
    this.antwoordCollection =  this.afs.collection('antwoorden', antw => {
      return antw.where('vraagNr', '==', vraagNr)
    });
    return this.antwoorden = this.antwoordCollection.valueChanges();

  }



  getJuisteAntwoorden() {

      
    this.antwoordCollection =  this.afs.collection('antwoorden', antw => {
      return antw.where('juist', '==', true)
    });
    return this.antwoorden = this.antwoordCollection.valueChanges();
  }




}
