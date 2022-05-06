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
 
  preis_feld: number;
  item: number[] = [];
  percentages:number[] = [];
  percentageErdstrasse:number;
  count: number[];
  addtocounts: number;
  mitarbeiterGesamt: number;
  mitarbeiter: number;
  preis_zelt:number;
  zeltAnzahl:number;
  preis_erdstrasse:number;
  erdstrasseAnzahl:number;
  timer = setInterval(() => {
    this.interval();
  }, 1000);

  constructor(public data : DataService) {
    this.counter = 0; // von Datastorage setzen
    this.preis_feld = 25;
    this.addcounter = 0; // null am anfang wichtig
    this.preis_fisch = 15;
    this.item;
    this.addtocounts;
    this.timer;
    this.mitarbeiterGesamt = 0;
    this.mitarbeiter = 5;
    this.preis_zelt=200;
    this.zeltAnzahl=0;
    this.preis_erdstrasse=500;
    this.erdstrasseAnzahl=0;
    this.percentageErdstrasse=5;

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
    this.addcounter = this.data.arbeitstellen.feldanzahl * 2 + this.data.arbeitstellen.fischeranzahl  * 1; //jedes mal neu hinzufügen wenn es gibt
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
  // Arbeitstellen
  feld() {
    if(this.mitarbeiter>=5){
    this.funktion_kaufen(this.preis_feld, this.data.arbeitstellen.feldanzahl, this.addcounter);
    this.preis_feld = Math.round(this.item[1]);
    this.data.arbeitstellen.feldanzahl = this.item[2];
   
    this.addtocount();
    this.mitarbeiterGesamt+=5;
    this.mitarbeiter-=5;
    } else {
      alert("Keine freie Mitarbeiter");
    }
  }

  fischer() {
    if(this.counter>this.preis_fisch) {
    if(this.mitarbeiter>=2){
    this.funktion_kaufen(this.preis_fisch, this.data.arbeitstellen.fischeranzahl, this.addcounter);
    this.preis_fisch = Math.round(this.item[1]);
   this.data.arbeitstellen.fischeranzahl = this.item[2];
    this.addtocounts = 1;
    this.addtocount();
    this.mitarbeiterGesamt+=2;
    this.mitarbeiter-=2
  
  } else {
    alert("Keine freie Mitarbeiter");
  } 
} else {
    alert("Kein Geld Leider")
  }
}



  // funktion_kaufen2 kaufen
  funktion_kaufen2(preis, anzahl) {
    if (this.counter <= 0) {
      alert('Kein Geld');
    } else {
      if (anzahl == 0) {
        // preis; // default in die hauptmethode einsetzen
        if (this.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
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
  
  
  //Wohnraum
  zelt() {
    if(this.counter>=this.preis_zelt) {
    this.funktion_kaufen2(this.preis_zelt,this.zeltAnzahl);
    this.preis_zelt = Math.round(this.item[1]);
    this.zeltAnzahl = this.item[2];
    this.mitarbeiter +=2;
    } else {
      alert("Kein Geld leider")
    }
  }

  //Infrastruktur
  percentage(counter,percentage) {
    counter = (this.counter/100)*percentage;
    this.percentages[1] = Math.round(counter);
    return this.percentages;
  }


  erdstrasse() { //5 kps%
    if(this.counter>=this.preis_erdstrasse) {
    this.funktion_kaufen2(this.preis_erdstrasse,this.erdstrasseAnzahl)
    this.preis_erdstrasse = Math.round(this.item[1]);
    this.erdstrasseAnzahl = this.item[2];
    this.percentage(this.counter,this.percentageErdstrasse);
    this.addcounter+=this.percentages[1];
    } else {
      alert("Kein Geld leider")
    }
  }



  ngOnInit() {}
}
