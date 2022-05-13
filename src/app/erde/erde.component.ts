import { Component, OnInit} from '@angular/core';
import { DataService } from '../dataservice/data.service';

@Component({
  selector: 'app-erde',
  templateUrl: './erde.component.html',
  styleUrls: ['./erde.component.css'],
})
export class ErdeComponent implements OnInit {

  isintervallRunning: boolean = false;

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
  }

  showAliens() {
    let aliens = document.getElementById('aliens');
    aliens.classList.remove('hidden');

    setTimeout(() => {
      aliens.classList.add('hidden');
    }, 2820);
  }
}
