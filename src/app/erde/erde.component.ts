import { Component, OnInit} from '@angular/core';
import { DataService } from '../dataservice/data.service';

@Component({
  selector: 'app-erde',
  templateUrl: './erde.component.html',
  styleUrls: ['./erde.component.css'],
})
export class ErdeComponent implements OnInit {

  cookiecounter: number;
  isintervallRunning: boolean = false;

  constructor(public data : DataService) {
  }

  add(number: number) {
    this.data.click.counter += number;
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
    console.log('Show Aliens');

    setTimeout(() => {
      aliens.classList.add('hidden');
      console.log('Hide Aliens');
    }, 2820);
  }
}
