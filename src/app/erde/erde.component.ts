import { Component, OnInit, VERSION } from '@angular/core';
import { DataService } from '../dataservice/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  cookiecounter: number;
  isintervallRunning: boolean = false;

  constructor() {
    this.cookiecounter = 0;
  }

  add(number: number) {
    this.cookiecounter += number;
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
