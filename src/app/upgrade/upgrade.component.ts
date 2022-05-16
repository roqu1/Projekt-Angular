import { Component, OnInit } from '@angular/core';
import { ClickerModule } from '../counter/clicker.module';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { DataService } from '../dataservice/data.service';
import Swal from 'sweetalert2';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css'],
})
export class UpgradeComponent implements OnInit {
  addcounter: number;
  item: number[] = [];
  percentages: number[] = [];
  count: number[];
  mitarbeiterGesamtStr: String;
  mitarbeiterGesamt: number;
  mitarbeiterStr: String;
  mitarbeiter: number;
  // Arbeitstellen
  preis_fisch: number;
  preis_feld: number;
  preis_holzfaeller: number;
  preis_mine: number;
  preis_oel: number;
  // Wohnraum
  preis_zelt: number;
  preis_bungalow: number;
  preis_einfamilienhaus: number;
  preis_haus: number;
  preis_mehrfamilienhaus: number;
  // Infrastruktur
  preis_erdstrasse: number;
  percentageErdstrasse: number;
  preis_wasser:number;
  percentagewasser: number;
  preis_strom:number;
  percentagestrom:number;
  preis_strasse:number;
  percentagestrasse: number;
  preis_technik:number;
  percentagetechnik: number;
  
  //buttons

  
  //Update Zeitlich
  updateCounter = setInterval(() => {
    this.counterToString();
    this.disableButton();
    
  }, 100);
  timer = setInterval(() => {
    this.interval();
  }, 1000);

  constructor(public data: DataService) {
    this.addcounter = 0; // null am anfang wichtig
    this.item;
    this.timer;
    // Mitarbeiter P.S die Reihenfolge ist richtig
    this.mitarbeiter = 0;
    this.mitarbeiterGesamt = 0;
    this.mitarbeiterGesamtStr = '' + this.mitarbeiterGesamt;
    this.mitarbeiterStr = '' + this.mitarbeiter;
    // Arbeitstellen
    this.preis_feld = 50;
    this.preis_fisch = 30;
    this.preis_holzfaeller = 90;
    this.preis_mine = 150;
    this.preis_oel = 300;
    // Wohnraum
    this.preis_zelt = 30;
    this.preis_bungalow = 50;
    this.preis_haus = 80;
    this.preis_einfamilienhaus = 130;
    this.preis_mehrfamilienhaus = 200;
    // Infrastruktur
    this.preis_erdstrasse = 500;
    this.percentageErdstrasse = 2;
    this.preis_wasser = 600;
    this.percentagewasser = 5;
    this.preis_strom = 1000;
    this.percentagestrom = 7.5;
    this.preis_strasse = 2000;
    this.percentagestrasse=10;
    this.preis_technik = 3000;
    this.percentagetechnik = 15;
    
  }

  update() {
    this.timer;
  }

  interval() {
    this.data.click.counter += this.addcounter;
  }

  kaufen(preis: number) {
    this.data.click.counter -= Math.round(preis);
  }

  addtocount() {
    //jedes mal neu hinzufügen wenn es gibt
    //Arbeitstellen
    this.addcounter = this.data.arbeitstellen.fischeranzahl * 1;
    this.addcounter += this.data.arbeitstellen.feldanzahl * 2;
    this.addcounter += this.data.arbeitstellen.holzfaeller * 5;
    this.addcounter += this.data.arbeitstellen.mine * 15;
    this.addcounter += this.data.arbeitstellen.oel * 30;
    //Infrastruktur
    this.addcounter += Math.round(this.data.infrastruktur.erdstrasseanzahl *(this.addcounter / 100) * this.percentageErdstrasse);
    this.addcounter += Math.round(this.data.infrastruktur.wasseranzahl *(this.addcounter / 100) * this.percentagewasser);
    this.addcounter += Math.round(this.data.infrastruktur.stromanzahl *(this.addcounter / 100) * this.percentagestrom);
    this.addcounter += Math.round(this.data.infrastruktur.strasseanzahl *(this.addcounter / 100) * this.percentagestrasse);
    this.addcounter += Math.round(this.data.infrastruktur.technikanzahl *(this.addcounter / 100) * this.percentagetechnik);
    this.update();
    this.disableButton();
  }

  funktion_kaufen(preis, anzahl) {
    if (this.data.click.counter <= 0) {
      this.nomoney();
    } else {
      if (anzahl == 0) {
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          Math.round((preis *= 1.45));
          this.item[1] = preis;
          return this.item;
        } else {
          this.nomoney();
        }
      } else if (anzahl > 0 && anzahl <= 4) {
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          preis = preis *= 1.35;
          this.item[1] = preis;
          return this.item;
        } else {
          this.nomoney();
        }
      } else if (anzahl > 4 && anzahl <= 8) {
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          preis = preis *= 1.25;
          this.item[1] = preis;
          return this.item;
        } else {
          this.nomoney();
        }
      } else if (anzahl > 8) {
        if (this.data.click.counter >= preis) {
          this.kaufen(preis);
          this.item[2] = anzahl += 1;
          preis = preis *= 1.10;
          this.item[1] = preis;
          return this.item;
        } else {
          this.nomoney();
        }
      } else {
        this.fehler();
      }
    }
  }

  mitarbeiter_funktion(gesamt, aktuell) {
    this.mitarbeiterGesamtStr = '' + gesamt;
    this.mitarbeiterStr = '' + aktuell;
    this.mitarbeiterGesamtStr = this.mitarbeiterGesamtStr.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );
    this.mitarbeiterStr = this.mitarbeiterStr.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );
  }
  // Arbeitstellen

  fischer() {
    if (this.data.click.counter >= this.preis_fisch) {
      if (this.mitarbeiter >= 2) {
        this.funktion_kaufen(
          this.preis_fisch,
          this.data.arbeitstellen.fischeranzahl
        );
        this.preis_fisch = Math.round(this.item[1]);
        this.data.arbeitstellen.fischeranzahl = this.item[2];
        this.addtocount();
        this.mitarbeiterGesamt += 2;
        this.mitarbeiter -= 2;
        this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);

        let text = this.data.arbeitstellen.fischeranzahl.toString();
        document.getElementById(text + 'fisch').style.visibility = 'visible';
      } else {
        this.noworkers();
      }
    } else {
      this.nomoney();
    }
  }
  feld() {
    
    if (this.data.click.counter >= this.preis_feld) {
      if (this.mitarbeiter >= 5) {
        if (this.data.infrastruktur.erdstrasseanzahl >0 && this.data.infrastruktur.wasseranzahl > 0) {
        this.funktion_kaufen(
          this.preis_feld,
          this.data.arbeitstellen.feldanzahl
        );
        this.preis_feld = Math.round(this.item[1]);
        this.data.arbeitstellen.feldanzahl = this.item[2];

        this.addtocount();
        this.mitarbeiterGesamt += 5;
        this.mitarbeiter -= 5;
        this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);

        let text = this.data.arbeitstellen.feldanzahl.toString();
        document.getElementById(text + 'feld').style.visibility = 'visible';
        } else {
          Swal.fire ({
            text:'Sie müssen zuerst Wasserversorgung und Erdstraße bauen'
          })
        }
      } else {
        this.noworkers();
      }
    } else {
      this.nomoney();
    }
  }

  holzfaeller() {
    if (this.data.click.counter >= this.preis_holzfaeller) {
      if (this.mitarbeiter >= 10) {
        if (this.data.infrastruktur.erdstrasseanzahl >0 && this.data.infrastruktur.technikanzahl > 0) {
        this.funktion_kaufen(
          this.preis_holzfaeller,
          this.data.arbeitstellen.holzfaeller
        );
        this.preis_feld = Math.round(this.item[1]);
        this.data.arbeitstellen.holzfaeller = this.item[2];

        this.addtocount();
        this.mitarbeiterGesamt += 10;
        this.mitarbeiter -= 10;
        this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);

        let text = this.data.arbeitstellen.holzfaeller.toString();
        document.getElementById(text + 'holzfaeller').style.visibility =
          'visible';
        } else {
        Swal.fire ({
          text:'Sie müssen zuerst Wunder der Technik und Erdstraße bauen'
        })
      }
      } else {
        this.noworkers();
      }
    } else {
      this.nomoney();
    }
  }

  mine() {
    if (this.data.click.counter >= this.preis_mine) {
      if (this.mitarbeiter >= 50) {
        if (this.data.infrastruktur.erdstrasseanzahl >0 && this.data.infrastruktur.technikanzahl > 1 && this.data.infrastruktur.stromanzahl>0) {
        this.funktion_kaufen(this.preis_mine, this.data.arbeitstellen.mine);
        this.preis_mine = Math.round(this.item[1]);
        this.data.arbeitstellen.mine = this.item[2];

        this.addtocount();
        this.mitarbeiterGesamt += 50;
        this.mitarbeiter -= 50;
        this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);

        let text = this.data.arbeitstellen.mine.toString();
        document.getElementById(text + 'mine').style.visibility = 'visible';
      } else {
        Swal.fire ({
          text:'Sie müssen zuerst Wunder der Technik 2,Strom und Erdstraße bauen'
        })
      }
      } else {
        this.noworkers();
      }
    } else {
      this.nomoney();
    }
  }

  oel() {
    if (this.data.click.counter >= this.preis_oel) {
      if (this.mitarbeiter >= 70) {
        this.funktion_kaufen(this.preis_oel, this.data.arbeitstellen.oel);
        this.preis_oel = Math.round(this.item[1]);
        this.data.arbeitstellen.oel = this.item[2];

        this.addtocount();
        this.mitarbeiterGesamt += 70;
        this.mitarbeiter -= 70;
        this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);

        let text = this.data.arbeitstellen.oel.toString();
        document.getElementById(text + 'oel').style.visibility = 'visible';
      } else {
        this.noworkers();
      }
    } else {
      this.nomoney();
    }
  }

  //Wohnraum
  zelt() {
    if (this.data.click.counter >= this.preis_zelt) {
      this.funktion_kaufen(this.preis_zelt, this.data.wohnraum.zeltanzahl);
      this.preis_zelt = Math.round(this.item[1]);
      this.data.wohnraum.zeltanzahl = this.item[2];
      this.mitarbeiter += 2;
      this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);
    } else {
      this.nomoney();
    }
  }
  bungalow() {
    if (this.data.click.counter >= this.preis_bungalow) {
      this.funktion_kaufen(
        this.preis_bungalow,
        this.data.wohnraum.bungalowanzahl
      );
      this.preis_bungalow = Math.round(this.item[1]);
      this.data.wohnraum.bungalowanzahl = this.item[2];
      this.mitarbeiter += 4;
      this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);
    } else {
      this.nomoney();
    }
  }
  haus() {
    if (this.data.click.counter >= this.preis_haus) {
      this.funktion_kaufen(this.preis_haus, this.data.wohnraum.hausanzahl);
      this.preis_haus = Math.round(this.item[1]);
      this.data.wohnraum.hausanzahl = this.item[2];
      this.mitarbeiter += 6;
      this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);
    } else {
      this.nomoney();
    }
  }
  einfamilienhaus() {
    if (this.data.click.counter >= this.preis_einfamilienhaus) {
      this.funktion_kaufen(
        this.preis_einfamilienhaus,
        this.data.wohnraum.einfamilienhausanzahl
      );
      this.preis_einfamilienhaus = Math.round(this.item[1]);
      this.data.wohnraum.einfamilienhausanzahl = this.item[2];
      this.mitarbeiter += 12;
      this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);
    } else {
      this.nomoney();
    }
  }
  mehrfamilienhaus() {
    if (this.data.click.counter >= this.preis_mehrfamilienhaus) {
      this.funktion_kaufen(
        this.preis_mehrfamilienhaus,
        this.data.wohnraum.mehrfamilienhausanzahl
      );
      this.preis_mehrfamilienhaus = Math.round(this.item[1]);
      this.data.wohnraum.mehrfamilienhausanzahl = this.item[2];
      this.mitarbeiter += 30;
      this.mitarbeiter_funktion(this.mitarbeiterGesamt, this.mitarbeiter);
    } else {
      this.nomoney();
    }
  }

  //Infrastruktur

  erdstrasse() {
    //5 kps%
    if (this.data.click.counter >= this.preis_erdstrasse) {
      this.funktion_kaufen(
        this.preis_erdstrasse,
        this.data.infrastruktur.erdstrasseanzahl
      );
      this.preis_erdstrasse = Math.round(this.item[1]);
      this.data.infrastruktur.erdstrasseanzahl = this.item[2];
      this.addtocount();
    } else {
      this.nomoney();
    }
  }

  wasser() {
    //10 kps%
    if (this.data.click.counter >= this.preis_wasser) {
      this.funktion_kaufen(
        this.preis_wasser,
        this.data.infrastruktur.wasseranzahl
      );
      this.preis_wasser = Math.round(this.item[1]);
      this.data.infrastruktur.wasseranzahl = this.item[2];
      this.addtocount();
    } else {
      this.nomoney();
    }
  }
  strom() {
    //25 kps%
    if (this.data.infrastruktur.stromanzahl==5) {
      Swal.fire ({
        icon:'error',
        title:'Fehler',
        text:'Mehr als funf kannst du nicht kaufen'
      })
    } else {
    if (this.data.click.counter >= this.preis_strom) {
      this.funktion_kaufen(this.preis_strom,this.data.infrastruktur.stromanzahl);
      if(this.data.infrastruktur.stromanzahl==0) {
        this.preis_strom = 2000;
    
      } else if(this.data.infrastruktur.stromanzahl==1) {
        this.preis_strom = 4000;
      } else if (this.data.infrastruktur.stromanzahl==2) {
        this.preis_strom = 8000;
      } else if (this.data.infrastruktur.stromanzahl==3) {
        this.preis_strom = 16000;
      }
      this.data.infrastruktur.stromanzahl = this.item[2];
      
      this.addtocount();
    } else {
      this.nomoney();
    }
  }
}

  strasse() {
      //50 kps%
      if (this.data.click.counter >= this.preis_strasse) {
        this.funktion_kaufen(
          this.preis_strasse,
          this.data.infrastruktur.strasseanzahl
        );
        this.preis_strasse = Math.round(this.item[1]);
        this.data.infrastruktur.strasseanzahl = this.item[2];
        this.addtocount();
      } else {
        this.nomoney();
      }
    }


    technik() {
      //100 kps%
      if (this.data.infrastruktur.technikanzahl==2) {
        Swal.fire ({
          icon:'error',
          title:'Fehler',
          text:'Mehr als zwei kannst du nicht kaufen'
        })
      } else {
      if (this.data.click.counter >= this.preis_technik) {
        this.funktion_kaufen(this.preis_technik,this.data.infrastruktur.technikanzahl);
        if (this.data.infrastruktur.technikanzahl ==0) {
          this.preis_technik = 6000;
        }
        this.data.infrastruktur.technikanzahl = this.item[2];
        this.addtocount();
      } else {
        this.nomoney();
      }
    }
  }





  // Fehler/Meldungen
  nomoney() {
    Swal.fire({
      icon: 'warning',
      title: 'Hat nicht funktioniert',
      text: 'Du hast kein Counter',
      confirmButtonText: 'Okay :(',
    });
  }

  fehler() {
    Swal.fire({
      icon: 'error',
      title: 'Fehler',
      text: 'Laden Sie die Seite wieder neu oder wenden Sie sich an der Administrator',
      confirmButtonText: 'Okay x(',
    });
  }
  noworkers() {
    Swal.fire({
      icon: 'info',
      title: 'Keine Mitarbeiter',
      text: 'Um Mitarbeiter zu bekommen, brauchen Sie mehr Wohnräume',
      timer: 3000,
    });
  }

   counterToString() {
    this.data.click.counterStr = '' + this.data.click.counter;

    this.data.click.counterStr = this.data.click.counterStr
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (this.data.click.counter < 1000) {
      return this.data.click.counterStr;
    } else if (this.data.click.counter <= 999999) {
      this.data.click.counterStr =
        this.data.click.counterStr.slice(0, -2) + 'k';
    } else if (this.data.click.counter <= 999999999) {
      this.data.click.counterStr =
        this.data.click.counterStr.slice(0, -4) + 'k';
    } else if (this.data.click.counter <= 999999999999) {
      this.data.click.counterStr =
        this.data.click.counterStr.slice(0, -6) + 'kk';
    } else {
      Swal.fire({
        title: 'Fehler passiert',
        text: 'Aktualisieren Sie die Seite wieder neu!',
      });
    }
  }

  disableButton() {
    const fisch = (document.getElementById('fisch') as HTMLInputElement);
    const feld = (document.getElementById('feld') as HTMLInputElement);
    const holzfaeller = (document.getElementById('holzfaeller') as HTMLInputElement);
    const mine = (document.getElementById('mine') as HTMLInputElement);
    const oel = (document.getElementById('oel') as HTMLInputElement);
    const erdstrasse = (document.getElementById('erdstrasse') as HTMLInputElement);
    const wasser = (document.getElementById('wasser') as HTMLInputElement);
    const strom = (document.getElementById('strom') as HTMLInputElement);
    const strasse = (document.getElementById('strasse') as HTMLInputElement);
    const technik = (document.getElementById('technik') as HTMLInputElement);
    const zelt = (document.getElementById('zelt') as HTMLInputElement);
    const bungalow = (document.getElementById('bungalow') as HTMLInputElement);
    const haus = (document.getElementById('haus') as HTMLInputElement);
    const einfamilienhaus = (document.getElementById('einfamilienhaus') as HTMLInputElement);
    const mehrfamilienhaus = (document.getElementById('mehrfamilienhaus') as HTMLInputElement);

  
    
    this.funktion_button(fisch,this.preis_fisch);
    this.funktion_button(feld,this.preis_feld);
    this.funktion_button(holzfaeller,this.preis_holzfaeller);
    this.funktion_button(mine,this.preis_mine);
    this.funktion_button(oel,this.preis_oel);
    this.funktion_button(erdstrasse,this.preis_erdstrasse);
    this.funktion_button(wasser,this.preis_wasser);
    this.funktion_button(strom,this.preis_strom);
    this.funktion_button(strasse,this.preis_strasse);
    this.funktion_button(technik,this.preis_technik);
    this.funktion_button(zelt,this.preis_zelt);
    this.funktion_button(bungalow,this.preis_bungalow);
    this.funktion_button(haus,this.preis_haus);
    this.funktion_button(einfamilienhaus,this.preis_einfamilienhaus);
    this.funktion_button(mehrfamilienhaus,this.preis_mehrfamilienhaus);


    if (this.data.infrastruktur.technikanzahl ==2) {
      this.funktion_button(technik,Number.MAX_SAFE_INTEGER);
    }
    
    if (this.data.infrastruktur.stromanzahl == 5) {
      this.funktion_button(strom,Number.MAX_SAFE_INTEGER);
    }


  }

  funktion_button(btnname,preisbtn) {
    if(this.data.click.counter<preisbtn) {
      btnname.disabled = true;
      btnname.style.transform = "translateY(0px)"
      btnname.style.boxShadow = "0 4px #999";
    } else if (this.data.click.counter>=preisbtn){
      btnname.disabled = false;
    }
  }

  // Buttons unten Upgrade
  reset() {
    Swal.fire({
      title: 'Bist du sicher?',
      text: "Du kannst deine Daten nicht wiederherstellen",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, Daten zurücksetzen!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.click.counter=0;
        this.addcounter=0;
        this.mitarbeiterGesamt=0;
        this.mitarbeiter=0;
        this.data.arbeitstellen.feldanzahl=0;
        this.data.arbeitstellen.fischeranzahl=0;
        this.data.arbeitstellen.holzfaeller=0;
        this.data.arbeitstellen.mine=0;
        this.data.arbeitstellen.oel=0;
        this.data.wohnraum.zeltanzahl=0;
        this.data.wohnraum.bungalowanzahl=0;
        this.data.wohnraum.hausanzahl=0;
        this.data.wohnraum.einfamilienhausanzahl=0;
        this.data.wohnraum.mehrfamilienhausanzahl=0;
        this.data.arbeitstellen.feldanzahl=0;
        this.data.arbeitstellen.feldanzahl=0;
        this.data.infrastruktur.erdstrasseanzahl=0;
        this.data.infrastruktur.wasseranzahl=0;
        this.data.infrastruktur.stromanzahl=0;
        this.data.infrastruktur.strasseanzahl=0;
        this.data.infrastruktur.technikanzahl=0;
        this.preis_bungalow=50;
        this.preis_einfamilienhaus=130;
        this.preis_erdstrasse=500;
        this.preis_feld=50;
        this.preis_fisch=30;
        this.preis_haus=80;
        this.preis_holzfaeller=90;
        this.preis_mehrfamilienhaus=200;
        this.preis_mine=150;
        this.preis_oel=300;
        this.preis_strasse=2000;
        this.preis_strom=1000;
        this.preis_technik=3000;
        this.preis_wasser=600;
        this.preis_zelt=30;
        Swal.fire(
          'Erfolgreich!',
          'Deine Daten sind zurückgesetzt.',
          'success'
        )
      }
    })
  }

  // FAQ

  faqclose() {
    const closediv = (document.getElementById('textfaq') as HTMLInputElement);
    closediv.style.display = "none";
  }

  faqopen() {
    const opendiv = (document.getElementById('textfaq') as HTMLInputElement);
    opendiv.style.display= "unset";
  }

  
  

  ngOnInit() {}
}
