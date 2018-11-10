import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WelkomComponent } from './welkom/welkom.component';
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from 'angularfire2';
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AntwoordService} from './services/antwoord.service';
import {DataService} from './services/data.service';
import {FormsModule} from '@angular/forms';
import { VragenDetailComponent } from './vragen-detail/vragen-detail.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TijdsIndicator } from './services/tijd.pipe';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ScoreComponent } from './score/score.component';


@NgModule({
  declarations: [
    AppComponent,
    WelkomComponent,
    LoginComponent,
    VragenDetailComponent,
    TijdsIndicator,
    ScoreComponent
      ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase, 'superquiz'),
    AngularFirestoreModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'welkom/:vraagNummer', component: VragenDetailComponent}, 
      {path: 'score', component: ScoreComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'}, // standaard naar login pagina
      {path: 'welkom', redirectTo: 'welkom/1'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'} // indien foute route
    ])
  ],
  providers: [AntwoordService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
