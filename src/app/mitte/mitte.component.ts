import { Component, OnInit } from '@angular/core';
import { Arbeitstellen } from '../counter/Arbeitstellen';
import { DataService } from '../dataservice/data.service';
import { Test2Component } from '../test2/test2.component';

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

    document.getElementById("1").style.visibility = "hidden";
    document.getElementById("2").style.visibility = "hidden";
    document.getElementById("3").style.visibility = "hidden";
    
    };
    
    einblenden(){
     
      let text = this.data.arbeitstellen.fischeranzahl.toString();
     document.getElementById(text).style.visibility = "visible";
    }
  ngOnInit() {
  }

}
