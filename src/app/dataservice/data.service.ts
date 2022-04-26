import { Injectable } from '@angular/core';
import { Model } from '../counter/model';

@Injectable()
export class DataService {
  items: Model[] = [];

  constructor() {
    this.items.push(new Model(1, 'Fischer', 0));
    this.items.push(new Model(2, 'Feld', 0));
  }
}
