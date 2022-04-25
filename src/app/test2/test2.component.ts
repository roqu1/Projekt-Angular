import { Component, OnInit } from '@angular/core';
import { ClickerModule } from '../counter/clicker.module';
import { Fischeranzahl } from '../counter/fischeranzahl';

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

  constructor() {
    this.counter = 150; // von Datastorage setzen
    this.fischerAnzahl = 0; // null am anfang wichtig
    this.feldAnzahl = 0;
    this.preis_feld = 25;
    this.addcounter = 0; // null am anfang wichtig
    this.preis_fisch = 15;
    this.item;
  }

  update() {
    setInterval(() => {
      this.interval();
    }, 1000);
  }

  interval() {
    this.counter += this.addcounter;  
  }

  kaufen(preis: number) {
    this.counter -= Math.round(preis);
  }

  funktion_kaufen(preis, anzahl, addcounter) {
    console.log(preis);
    if (this.counter <= 0) {
      alert('Kein Geld');
    } else {
      if (anzahl == 0) {
        // preis; // default in die hauptmethode einsetzen
        if (this.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          this.update();
          console.log('gekauft');
          Math.round((preis *= 1.5));
          console.log(preis);
          this.item[1] = preis;
          return this.item;
        } else {
          alert('Kein Geld');
        }
      } else if (anzahl > 0) {
        if (this.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          this.update(); // macht das gleiche wie addcounter
          console.log('Mehr gekauft');
          preis = preis *= 1.5;
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
    this.addcounter = 2;
    this.funktion_kaufen(this.preis_feld, this.feldAnzahl, this.addcounter);
    this.preis_feld = Math.round(this.item[1]);
    this.feldAnzahl = this.item[2];
  }

  fischer() {
    this.addcounter=1;
    this.funktion_kaufen(this.preis_fisch, this.fischerAnzahl, this.addcounter);
    this.preis_fisch= Math.round(this.item[1]);
    this.fischerAnzahl = this.item[2];
  }

  ngOnInit() {}
}
