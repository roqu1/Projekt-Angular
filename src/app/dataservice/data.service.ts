import { Injectable } from '@angular/core';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { Model } from '../counter/model';

@Injectable()
export class DataService {
  items: Model[] = [];
  private arbeit : Arbeitstellen;
  constructor() {
   this.items.push(new Model(1, 'Fischer', 0));
    this.items.push(new Model(2, 'Feld', 0));
    this.arbeit = { "feldanzahl": 0,
      "fischeranzahl": 0, "holzfaeller" : 0, "mine" : 0, "oel" : 0 
    }
  }

 get arbeitstellen(){
   return this.arbeit
 }
}
