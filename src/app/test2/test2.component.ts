import { Component, OnInit } from '@angular/core';
import { ClickerModule } from '../counter/clicker.module';
import { Arbeitstellen } from '../counter/Arbeitstellen';
@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
})
export class Test2Component implements OnInit {
  counter: number;
  preis_fisch: number;
  addcounter: number;
  fischerAnzahl: number;
  feldAnzahl: number;
  preis_feld: number;
  item: number[] = [];
  count: number[];
  addtocounts: number;
  mitarbeiterGesamt: number;
  mitarbeiter: number;
  preis_zelt:number;
  zeltAnzahl:number;
  timer = setInterval(() => {
    this.interval();
  }, 1000);

  constructor() {
    this.counter = 1500; // von Datastorage setzen
    this.fischerAnzahl = 0; // null am anfang wichtig
    this.feldAnzahl = 0;
    this.preis_feld = 25;
    this.addcounter = 0; // null am anfang wichtig
    this.preis_fisch = 15;
    this.item;
    this.addtocounts;
    this.timer;
    this.mitarbeiterGesamt = 0;
    this.mitarbeiter = 5;
    this.preis_zelt=10;
    this.zeltAnzahl=0;
  }

  update() {
    this.timer;
  }

  interval() {
    this.counter += this.addcounter;
  }

  kaufen(preis: number) {
    this.counter -= Math.round(preis);
  }

  addtocount() {
    this.addcounter = this.feldAnzahl * 2 + this.fischerAnzahl * 1; //jedes mal neu hinzufügen wenn es gibt
    this.update();
  }

  funktion_kaufen(preis, anzahl, addcounter) {
    if (this.counter <= 0) {
      alert('Kein Geld');
    } else {
      if (anzahl == 0) {
        // preis; // default in die hauptmethode einsetzen
        if (this.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          // this.update();
          console.log('gekauft');
          Math.round((preis *= 1.35));
          this.item[1] = preis;
          return this.item;
        } else {
          alert('Kein Geld');
        }
      } else if (anzahl > 0) {
        if (this.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          //this.update(); // macht das gleiche wie addcounter
          console.log('Mehr gekauft');
          preis = preis *= 1.35;
          this.item[1] = preis;
          return this.item;
        } else {
          alert('Kein Geld');
        }
      } else {
        alert('Es gibt ein Fehler');
      }
    }
  }

  feld() {
    if(this.mitarbeiter>=5){
    this.funktion_kaufen(this.preis_feld, this.feldAnzahl, this.addcounter);
    this.preis_feld = Math.round(this.item[1]);
    this.feldAnzahl = this.item[2];
   
    this.addtocount();
    this.mitarbeiterGesamt+=5;
    this.mitarbeiter-=5;
    } else {
      alert("Keine freie Mitarbeiter");
    }
  }

  fischer() {
    if(this.mitarbeiter>=2){
    this.funktion_kaufen(this.preis_fisch, this.fischerAnzahl, this.addcounter);
    this.preis_fisch = Math.round(this.item[1]);
    this.fischerAnzahl = this.item[2];
    this.addtocounts = 1;
    this.addtocount();
    this.mitarbeiterGesamt+=2;
    this.mitarbeiter-=2
  } else {
    alert("Keine freie Mitarbeiter");
  }
}



  // Bewohner kaufen
  bewohner(preis, anzahl, addcounter) {
    if (this.counter <= 0) {
      alert('Kein Geld');
    } else {
      if (anzahl == 0) {
        // preis; // default in die hauptmethode einsetzen
        if (this.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          console.log('gekauft');
          Math.round((preis *= 1.2));
          this.item[1] = preis;
          return this.item;
        } else {
          alert('Kein Geld');
        }
      } else if (anzahl > 0) {
        if (this.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          console.log('Mehr gekauft');
          preis = preis *= 1.2;
          this.item[1] = preis;
          return this.item;
        } else {
          alert('Kein Geld');
        }
      } else {
        alert('Es gibt ein Fehler');
      }
    }
  }
  
  
  
  zelt() {
    
  }



  ngOnInit() {}
}
