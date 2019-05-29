import {Pipe, PipeTransform} from '@angular/core';
import { GoogleTijdstip } from '../models/antwoord';

@Pipe({
    name: 'tijdsindicator'
})
export class TijdsIndicator implements PipeTransform {

    ms: string;
    sec;
    min;
    secondenTimestamp:number;
    minutenTimestamp:number;
    tijdsVerschil: Date;
    digits;
    digits1;
    digits2;
    sec2:string;
    min2:string;
    tijdstip: GoogleTijdstip;
    eersteTijdstip: GoogleTijdstip;

    tussenin:number;

    
    transform(value: any, eerstAntw: any): string {

        this.tijdstip = value;
        this.eersteTijdstip = eerstAntw;

        this.tussenin = (((this.tijdstip.seconds*1000)+(this.tijdstip.nanoseconds/1000000)) - ((this.eersteTijdstip.seconds*1000)+(this.eersteTijdstip.nanoseconds/1000000)));

        this.digits = (""+ 0 + 0 +this.tussenin).split("");

        this.secondenTimestamp = Math.floor(this.tussenin/1000);
        this.minutenTimestamp = Math.floor((this.tussenin/1000)/60);

        this.digits1 = (""+this.secondenTimestamp).split("");
        this.sec2 = this.digits1[this.digits1.length-2];


        if (parseInt(this.sec2) > 5 || parseInt(this.sec2) === null || this.sec2 === undefined){
            this.sec2 = "0";
        }


        this.digits2 = (""+this.minutenTimestamp).split("");
        this.min2 = this.digits2[this.digits2.length-2];


        if (parseInt(this.min2) > 5 || this.min2 === undefined || parseInt(this.min2)=== null){
            this.min2 = "0";
        }

        this.ms = this.digits[this.digits.length-3] + this.digits[this.digits.length-2] +'ms';
        this.sec = this.sec2 +  this.digits1[this.digits1.length-1] +'\" ';
        this.min = this.min2 + this.digits2[this.digits2.length-1] +'\' ';


        if (this.tussenin === 0) {

            return "";

        } else if((this.min2 === "0") && (this.digits2[this.digits2.length-1]==="0")) {
            return '+' + this.sec + this.ms;
        } else {
            return '+' + this.min + this.sec + this.ms;

        }



    }
}