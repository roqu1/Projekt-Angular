import { Component, OnInit } from '@angular/core';
import { Arbeitstellen } from '../counter/Arbeitstellen';

@Component({
  selector: 'app-mitte',
  templateUrl: './mitte.component.html',
  styleUrls: ['./mitte.component.css']
})
export class MitteComponent implements OnInit {

  
  x : number 
  constructor() { }


  ausblenden() {

    document.getElementById("1").style.visibility = "hidden";
    document.getElementById("2").style.visibility = "hidden";
    document.getElementById("3").style.visibility = "hidden";
    
    };
    
    einblenden(){
      
      let text = this.x.toString();
      document.getElementById(text).style.visibility = "visible";
      this.x += 1
      
    }
  ngOnInit() {
  }

}
