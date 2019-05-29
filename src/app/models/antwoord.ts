export interface Antwoord {
    antwoord:string;
    vraagNr: number,
    tafel: string;
    tijdstip: any;
    juist: boolean;

}

export interface Anker {
    anker: number;
    invulLabel: boolean;
}

export interface GoogleTijdstip {
    seconds: number;
    nanoseconds: number;
}
