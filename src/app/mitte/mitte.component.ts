import { Component, OnInit } from '@angular/core';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { DataService } from '../dataservice/data.service';
import { UpgradeComponent } from '../upgrade/upgrade.component';

@Component({
  selector: 'app-mitte',
  templateUrl: './mitte.component.html',
  styleUrls: ['./mitte.component.css']
})
export class MitteComponent implements OnInit {

  
  x : number 
  constructor(public data : DataService) { 
   
  }

  ausblenden() {

    document.getElementById("1fisch").style.visibility = "hidden";
    document.getElementById("2fisch").style.visibility = "hidden";
    document.getElementById("3fisch").style.visibility = "hidden";

    document.getElementById("1feld").style.visibility = "hidden";
    document.getElementById("2feld").style.visibility = "hidden";
    document.getElementById("3feld").style.visibility = "hidden";
    };
   
  ngOnInit() {
  }

}
