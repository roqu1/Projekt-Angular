import { Component, OnInit } from '@angular/core';
import { ClickerModule } from '../counter/clicker.module';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { DataService } from '../dataservice/data.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
})
export class Test2Component implements OnInit {

  addcounter: number;
  
  item: number[] = [];
  percentages:number[] = [];
  percentageErdstrasse:number;
  count: number[];
  mitarbeiterGesamt: number;
  mitarbeiter: number;
// Arbeitstellen
  preis_fisch: number;
  preis_feld: number;
// Wohnraum
  preis_zelt:number;
  preis_bungalow:number;
  preis_einfamilienhaus:number;
  preis_haus:number;
  preis_mehrfamilienhaus:number;
// Infrastruktur
  preis_erdstrasse:number;
  timer = setInterval(() => {
    this.interval();
  }, 1000);

  constructor(public data : DataService) {
    this.addcounter = 0; // null am anfang wichtig
    this.item;
    this.timer;
    this.mitarbeiterGesamt = 0;
    this.mitarbeiter = 99995;
    // Arbeitstellen
    this.preis_feld = 25;
    this.preis_fisch = 15;
    // Wohnraum
    this.preis_zelt=200;
    this.preis_bungalow=300;
    this.preis_haus=500;
    this.preis_einfamilienhaus=1000;
    this.preis_mehrfamilienhaus=3000;
    // Infrastruktur
    this.preis_erdstrasse=500;
    this.percentageErdstrasse=5;

  }

  update() {
    this.timer;
  }

  interval() {
    this.data.click.counter += (this.addcounter/100)*100;
  }

  kaufen(preis: number) {
    this.data.click.counter -= Math.round(preis);
  }

  addtocount() {//jedes mal neu hinzufügen wenn es gibt
    this.addcounter = this.data.arbeitstellen.feldanzahl * 2;
    this.addcounter += this.data.arbeitstellen.fischeranzahl  * 1; 



    this.addcounter += Math.round(this.data.infrastruktur.erdstrasseanzahl*((this.addcounter/100)*this.percentageErdstrasse));
    console.log(this.addcounter);
    this.update();
  }

  funktion_kaufen(preis, anzahl) {
    if (this.data.click.counter <= 0) {
      alert('Kein Geld');
    } else {
      if (anzahl == 0) {
        // preis; // default in die hauptmethode einsetzen
        if (this.data.click.counter >= preis) {
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
        if (this.data.click.counter >= preis) {
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
    this.funktion_kaufen(this.preis_feld, this.data.arbeitstellen.feldanzahl);
    this.preis_feld = Math.round(this.item[1]);
    this.data.arbeitstellen.feldanzahl = this.item[2];
   
    this.addtocount();
    this.mitarbeiterGesamt+=5;
    this.mitarbeiter-=5;
      
      let text = this.data.arbeitstellen.feldanzahl.toString();
    document.getElementById(text+"feld").style.visibility = "visible";
    } else {
      alert("Keine freie Mitarbeiter");
    }
  }

  fischer() {
    if(this.data.click.counter>this.preis_fisch) {
    if(this.mitarbeiter>=2){
    this.funktion_kaufen(this.preis_fisch, this.data.arbeitstellen.fischeranzahl);
    this.preis_fisch = Math.round(this.item[1]);
   this.data.arbeitstellen.fischeranzahl = this.item[2];
    this.addtocount();
    this.mitarbeiterGesamt+=2;
    this.mitarbeiter-=2
      
        let text = this.data.arbeitstellen.fischeranzahl.toString();
    document.getElementById(text+"fisch").style.visibility = "visible";
  
  } else {
    alert("Keine freie Mitarbeiter");
  } 
} else {
    alert("Kein Geld Leider")
  }
}



  // funktion_kaufen2 kaufen
  funktion_kaufen2(preis, anzahl) {
    if (this.data.click.counter <= 0) {
      alert('Kein Geld');
    } else {
      if (anzahl == 0) {
        // preis; // default in die hauptmethode einsetzen
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          Math.round((preis *= 1.2));
          this.item[1] = preis;
          return this.item;
        } else {
          alert('Kein Geld');
        }
      } else if (anzahl > 0) {
        if (this.data.click.counter >= preis) {
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
    if(this.data.click.counter>=this.preis_zelt) {
    this.funktion_kaufen2(this.preis_zelt,this.data.wohnraum.zeltanzahl);
    this.preis_zelt = Math.round(this.item[1]);
    this.data.wohnraum.zeltanzahl = this.item[2];
    this.mitarbeiter +=2;
    } else {
      alert("Kein Geld leider")
    }
  }
  bungalow() {
    if(this.data.click.counter>=this.preis_bungalow) {
    this.funktion_kaufen2(this.preis_bungalow,this.data.wohnraum.bungalowanzahl);
    this.preis_bungalow = Math.round(this.item[1]);
    this.data.wohnraum.bungalowanzahl = this.item[2];
    this.mitarbeiter +=4;
    } else {
      alert("Kein Geld leider")
    }
  }
  haus() {
    if(this.data.click.counter>=this.preis_haus) {
    this.funktion_kaufen2(this.preis_haus,this.data.wohnraum.hausanzahl);
    this.preis_haus = Math.round(this.item[1]);
    this.data.wohnraum.hausanzahl = this.item[2];
    this.mitarbeiter +=6;
    } else {
      alert("Kein Geld leider")
    }
  }
  einfamilienhaus() {
    if(this.data.click.counter>=this.preis_einfamilienhaus) {
    this.funktion_kaufen2(this.preis_einfamilienhaus,this.data.wohnraum.einfamilienhausanzahl);
    this.preis_einfamilienhaus = Math.round(this.item[1]);
    this.data.wohnraum.einfamilienhausanzahl = this.item[2];
    this.mitarbeiter +=12;
    } else {
      alert("Kein Geld leider")
    }
  }
  mehrfamilienhaus() {
    if(this.data.click.counter>=this.preis_mehrfamilienhaus) {
    this.funktion_kaufen2(this.preis_mehrfamilienhaus,this.data.wohnraum.mehrfamilienhausanzahl);
    this.preis_mehrfamilienhaus = Math.round(this.item[1]);
    this.data.wohnraum.mehrfamilienhausanzahl = this.item[2];
    this.mitarbeiter +=30;
    } else {
      alert("Kein Geld leider")
    }
  }

  
  
  
  //Infrastruktur


  erdstrasse() { //5 kps%
    if(this.data.click.counter>=this.preis_erdstrasse) {
    this.funktion_kaufen2(this.preis_erdstrasse,this.data.infrastruktur.erdstrasseanzahl);
    this.preis_erdstrasse = Math.round(this.item[1]);
    this.data.infrastruktur.erdstrasseanzahl = this.item[2];
    this.addtocount();
    
    } else {
      alert("Kein Geld leider")
    }
  }



  ngOnInit() {}
}
