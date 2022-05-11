import { Component, OnInit } from '@angular/core';
import { ClickerModule } from '../counter/clicker.module';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { DataService } from '../dataservice/data.service';
import Swal from 'sweetalert2'


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
  mitarbeiterGesamtStr:String;
  mitarbeiterGesamt: number;
  mitarbeiterStr:String;
  mitarbeiter: number;
// Arbeitstellen
  preis_fisch: number;
  preis_feld: number;
  preis_holzfaeller:number;
  preis_mine:number;
  preis_oel:number;
// Wohnraum
  preis_zelt:number;
  preis_bungalow:number;
  preis_einfamilienhaus:number;
  preis_haus:number;
  preis_mehrfamilienhaus:number;
// Infrastruktur
  preis_erdstrasse:number;
  updateCounter = setInterval(() => {
    this.counterToString();
  }, 100);
  timer = setInterval(() => {
    this.interval();
  }, 1000);
  

  constructor(public data : DataService) {
    this.addcounter = 0; // null am anfang wichtig
    this.item;
    this.timer;
    // Mitarbeiter P.S die Reihenfolge ist richtig
    this.mitarbeiter = 0;
    this.mitarbeiterGesamt = 0;
    this.mitarbeiterGesamtStr=''+this.mitarbeiterGesamt;
    this.mitarbeiterStr=''+this.mitarbeiter;
    // Arbeitstellen
    this.preis_feld = 400;
    this.preis_fisch = 200;
    this.preis_holzfaeller=600;
    this.preis_mine=1000;
    this.preis_oel=2500;
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
    //Arbeitstellen
    this.addcounter = this.data.arbeitstellen.fischeranzahl  * 1;
    this.addcounter += this.data.arbeitstellen.feldanzahl * 2;
    this.addcounter += this.data.arbeitstellen.holzfaeller * 5;
    this.addcounter += this.data.arbeitstellen.mine * 15;
    this.addcounter += this.data.arbeitstellen.oel * 30;
    //Infrastruktur
    this.addcounter += Math.round(this.data.infrastruktur.erdstrasseanzahl*((this.addcounter/100)*this.percentageErdstrasse));
    console.log(this.addcounter);
    this.update();
  }

  funktion_kaufen(preis, anzahl) {
    
    if (this.data.click.counter <= 0) {
      this.nomoney();
    } else {
      if (anzahl == 0) {
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          Math.round((preis *= 1.35));
          this.item[1] = preis;
          return this.item;
        } else {
          this.nomoney();
        }
      } else if (anzahl >0 && anzahl <=4) {
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          preis = preis *= 1.20;
          this.item[1] = preis;
          return this.item;
        } else {
          this.nomoney();
        }
      } else if (anzahl >4 && anzahl <=8){ 
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          preis = preis *= 1.10;
          this.item[1] = preis;
          return this.item;
        } else {
          this.nomoney();
        } 
      } else if (anzahl >8){ 
          if (this.data.click.counter >= preis) {
            this.kaufen(preis);
            this.item[2] = anzahl += 1;
            preis = preis *= 1.05;
            this.item[1] = preis;
            return this.item;
          } else {
            this.nomoney();
          }
    }else {
      this.fehler();
      }
    }
  }

  mitarbeiter_funktion (gesamt,aktuell) {
    this.mitarbeiterGesamtStr=''+gesamt
    this.mitarbeiterStr = ''+aktuell
    this.mitarbeiterGesamtStr=this.mitarbeiterGesamtStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    this.mitarbeiterStr=this.mitarbeiterStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // Arbeitstellen
  

  fischer() {
    if(this.data.click.counter>this.preis_fisch) {
    if(this.mitarbeiter>=2){
    this.funktion_kaufen(this.preis_fisch, this.data.arbeitstellen.fischeranzahl);
    this.preis_fisch = Math.round(this.item[1]);
   this.data.arbeitstellen.fischeranzahl = this.item[2];
    this.addtocount();
    this.mitarbeiterGesamt+=2;
    this.mitarbeiter-=2
    this.mitarbeiter_funktion(this.mitarbeiterGesamt,this.mitarbeiter);
      
    let text = this.data.arbeitstellen.fischeranzahl.toString();
    document.getElementById(text+"fisch").style.visibility = "visible";
  
  } else {
    this.noworkers();
  } 
} else {
    this.nomoney();
  }
}
feld() {
  if(this.data.click.counter>this.preis_feld) {
  if(this.mitarbeiter>=5){
  this.funktion_kaufen(this.preis_feld, this.data.arbeitstellen.feldanzahl);
  this.preis_feld = Math.round(this.item[1]);
  this.data.arbeitstellen.feldanzahl = this.item[2];
 
  this.addtocount();
  this.mitarbeiterGesamt+=5;
  this.mitarbeiter-=5;
  this.mitarbeiter_funktion(this.mitarbeiterGesamt,this.mitarbeiter);
    
  let text = this.data.arbeitstellen.feldanzahl.toString();
  document.getElementById(text+"feld").style.visibility = "visible";
  } else {
    this.noworkers();
  }
 } else {
    this.nomoney();
  }
}

holzfaeller() {
  if(this.data.click.counter>this.preis_holzfaeller) {
  if(this.mitarbeiter>=5){
  this.funktion_kaufen(this.preis_holzfaeller, this.data.arbeitstellen.holzfaeller);
  this.preis_feld = Math.round(this.item[1]);
  this.data.arbeitstellen.holzfaeller = this.item[2];
 
  this.addtocount();
  this.mitarbeiterGesamt+=10;
  this.mitarbeiter-=10;
  this.mitarbeiter_funktion(this.mitarbeiterGesamt,this.mitarbeiter);
    
  let text = this.data.arbeitstellen.holzfaeller.toString();
  document.getElementById(text+"holzfaeller").style.visibility = "visible";
  } else {
    this.noworkers();
  }
 } else {
    this.nomoney();
  }
}

mine() {
  if(this.data.click.counter>this.preis_mine) {
  if(this.mitarbeiter>=5){
  this.funktion_kaufen(this.preis_mine, this.data.arbeitstellen.mine);
  this.preis_mine = Math.round(this.item[1]);
  this.data.arbeitstellen.mine = this.item[2];
 
  this.addtocount();
  this.mitarbeiterGesamt+=50;
  this.mitarbeiter-=50;
  this.mitarbeiter_funktion(this.mitarbeiterGesamt,this.mitarbeiter);
    
  let text = this.data.arbeitstellen.mine.toString();
  document.getElementById(text+"mine").style.visibility = "visible";
  } else {
    this.noworkers();
  }
 } else {
    this.nomoney();
  }
}

oel() {
  if(this.data.click.counter>this.preis_oel) {
  if(this.mitarbeiter>=5){
  this.funktion_kaufen(this.preis_oel, this.data.arbeitstellen.oel);
  this.preis_oel = Math.round(this.item[1]);
  this.data.arbeitstellen.oel = this.item[2];
 
  this.addtocount();
  this.mitarbeiterGesamt+=70;
  this.mitarbeiter-=70;
  this.mitarbeiter_funktion(this.mitarbeiterGesamt,this.mitarbeiter);
    
  let text = this.data.arbeitstellen.oel.toString();
  document.getElementById(text+"oel").style.visibility = "visible";
  } else {
    this.noworkers();
  }
 } else {
    this.nomoney();
  }
}



  // funktion_kaufen2 kaufen
 /* funktion_kaufen2(preis, anzahl) {
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
  } */
  
  
  //Wohnraum
  zelt() {
    if(this.data.click.counter>=this.preis_zelt) {
    this.funktion_kaufen(this.preis_zelt,this.data.wohnraum.zeltanzahl);
    this.preis_zelt = Math.round(this.item[1]);
    this.data.wohnraum.zeltanzahl = this.item[2];
    this.mitarbeiter +=2;
    } else {
      this.nomoney();
    }
  }
  bungalow() {
    if(this.data.click.counter>=this.preis_bungalow) {
    this.funktion_kaufen(this.preis_bungalow,this.data.wohnraum.bungalowanzahl);
    this.preis_bungalow = Math.round(this.item[1]);
    this.data.wohnraum.bungalowanzahl = this.item[2];
    this.mitarbeiter +=4;
    } else {
      this.nomoney();
    }
  }
  haus() {
    if(this.data.click.counter>=this.preis_haus) {
    this.funktion_kaufen(this.preis_haus,this.data.wohnraum.hausanzahl);
    this.preis_haus = Math.round(this.item[1]);
    this.data.wohnraum.hausanzahl = this.item[2];
    this.mitarbeiter +=6;
    } else {
      this.nomoney();
    }
  }
  einfamilienhaus() {
    if(this.data.click.counter>=this.preis_einfamilienhaus) {
    this.funktion_kaufen(this.preis_einfamilienhaus,this.data.wohnraum.einfamilienhausanzahl);
    this.preis_einfamilienhaus = Math.round(this.item[1]);
    this.data.wohnraum.einfamilienhausanzahl = this.item[2];
    this.mitarbeiter +=12;
    } else {
      this.nomoney();
    }
  }
  mehrfamilienhaus() {
    if(this.data.click.counter>=this.preis_mehrfamilienhaus) {
    this.funktion_kaufen(this.preis_mehrfamilienhaus,this.data.wohnraum.mehrfamilienhausanzahl);
    this.preis_mehrfamilienhaus = Math.round(this.item[1]);
    this.data.wohnraum.mehrfamilienhausanzahl = this.item[2];
    this.mitarbeiter +=30;
    } else {
      this.nomoney();
    }
  }

  
  
  
  //Infrastruktur


  erdstrasse() { //5 kps%
    if(this.data.click.counter>=this.preis_erdstrasse) {
    this.funktion_kaufen(this.preis_erdstrasse,this.data.infrastruktur.erdstrasseanzahl);
    this.preis_erdstrasse = Math.round(this.item[1]);
    this.data.infrastruktur.erdstrasseanzahl = this.item[2];
    this.addtocount();
    
    } else {
      this.nomoney();
    }
  }



  nomoney(){
    Swal.fire({
      icon:'warning',
      title: 'Hat nicht funktioniert',
      text: 'Du hast ja kein Geld!',
      confirmButtonText: 'Okay :('
})
  }

  fehler(){
    Swal.fire({
      icon:'error',
      title: 'Fehler',
      text: 'Laden Sie die Seite wieder neu oder wenden Sie sich an der Administrator',
      confirmButtonText: 'Okay x('
})
  }
  noworkers(){
    Swal.fire({
      icon:'info',
      title:'Keine Mitarbeiter',
      text:'Um Mitarbeiter zu bekommen, brauchen Sie etwas in Wohnraum zu kaufen',
      timer:3000
    })}

    counterToString() { 
      this.data.click.counterStr = ''+this.data.click.counter;
      
        this.data.click.counterStr= this.data.click.counterStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        
      if (this.data.click.counter<1000){
        return this.data.click.counterStr;
      } else if (this.data.click.counter<=999999) {
        this.data.click.counterStr= this.data.click.counterStr.slice(0,-2)+'k'
      } else  if (this.data.click.counter<=999999999) {
        this.data.click.counterStr= this.data.click.counterStr.slice(0,-4)+'k'
      } else  if (this.data.click.counter<=999999999999) {
        this.data.click.counterStr= this.data.click.counterStr.slice(0,-6)+'kk'
      } else {
        Swal.fire ({
          title:'Fehler passiert',
          text:'Aktualisieren Sie die Seite wieder neu!'
        })
      }
    }

  ngOnInit() {}
}
