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
  ngOnInit() {
  }

}
