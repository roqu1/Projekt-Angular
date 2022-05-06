import { Injectable } from '@angular/core';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { Model } from '../counter/model';
import { Wohnraum } from '../counter/Wohnraum';

@Injectable()
export class DataService {
  items: Model[] = [];
  private arbeit : Arbeitstellen;
  private wohn : Wohnraum;
  constructor() {
    this.arbeit = { "feldanzahl": 0,
      "fischeranzahl": 0, "holzfaeller" : 0, "mine" : 0, "oel" : 0 
    }
    this.wohn = {
      "zeltanzahl": 0,
      "bungalowanzahl":0,
      "hausanzahl":0, 
      "einfamilienhausanzahl":0,
      "mehrfamilienhausanzahl":0
    }
  }

 get arbeitstellen(){
   return this.arbeit
 }

 get wohnraum() {
   return this.wohn;
 }
}
