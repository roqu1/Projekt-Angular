import { Injectable } from '@angular/core';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { Model } from '../counter/model';
import { Wohnraum } from '../counter/Wohnraum';
import { Infrastruktur } from '../counter/Infrastruktur';
import { ClickerModule } from '../counter/clicker.module';

@Injectable()
export class DataService {
  items: Model[] = [];
  private arbeit : Arbeitstellen;
  private wohn : Wohnraum;
  private infra: Infrastruktur;
  private clicker: ClickerModule;
  constructor() {
    this.clicker = {
      "counter":1000000,
      "counterStr":"0",
      "gesamtmitarbeiterStr":"0",
      "mitarbeiterStr":"0"
    }

    this.arbeit = { "feldanzahl": 0,
      "fischeranzahl": 0,
      "holzfaeller" : 0, 
      "mine" : 0, 
      "oel" : 0 
    }
    this.wohn = {
      "zeltanzahl": 0,
      "bungalowanzahl":0,
      "hausanzahl":0, 
      "einfamilienhausanzahl":0,
      "mehrfamilienhausanzahl":0
    }
    this.infra = {
      "erdstrasseanzahl": 0,
      "wasseranzahl":0,
      "stromanzahl":0,
      "strasseanzahl":0,
      "technikanzahl":0
    }

    
  }

 get click() {
   return this.clicker;
 }

 get arbeitstellen(){
   return this.arbeit
 }

 get wohnraum() {
   return this.wohn;
 }

 get infrastruktur() {
   return this.infra;
 }
}
