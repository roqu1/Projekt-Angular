import { Component, OnInit} from '@angular/core';
import { DataService } from '../dataservice/data.service';

@Component({
  selector: 'app-erde',
  templateUrl: './erde.component.html',
  styleUrls: ['./erde.component.css'],
})
export class ErdeComponent implements OnInit {

  isintervallRunning: boolean = false;
  counterStr:String;

  constructor(public data : DataService) {
    
  }

  

  add() {
    this.data.click.counter++;
  }

  ngOnInit() {
    if (!this.isintervallRunning) {
      setInterval(this.showAliens, 200000);
      this.isintervallRunning = true;
    }
   /* this.counterStr = ''+this.data.click.counter;
    this.counterStr = this.counterStr.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );*/
  }

  showAliens() {
    let aliens = document.getElementById('aliens');
    aliens.classList.remove('hidden');

    setTimeout(() => {
      aliens.classList.add('hidden');
      
    }, 2820);
  }
}
