import { Component, OnInit } from '@angular/core';
import { DataService } from '../dataservice/data.service';

@Component({
  selector: 'app-erde',
  templateUrl: './erde.component.html',
  styleUrls: ['./erde.component.css'],
})
export class ErdeComponent implements OnInit {
  isintervallRunning: boolean = false;

  constructor(public data: DataService) {}

//
  add(event: MouseEvent) {
    this.data.click.counter++;
    console.log(event);
    this.clickerNummer(event);
  }
//


  ngOnInit() {
    if (!this.isintervallRunning) {
      setInterval(this.showAliens, 2000);
      this.isintervallRunning = true;
    }
     
//
    let cookie = document.getElementById('cookie');

    if (cookie) {
      console.log('init click event');
      cookie.addEventListener('click', (event) => {
        this.add(event);
      });
    }
  }
//


  showAliens() {
    let aliens = document.getElementById('aliens');
    aliens.classList.remove('hidden');

    setTimeout(() => {
      aliens.classList.add('hidden');
    }, 2820);
  }

  //
  fadeout(element: HTMLElement, time, moveInterval) {
    element.style.opacity = '100';
    let opaNum = Number.parseInt(element.style.opacity);
    let fadeoutInterval = window.setInterval(() => {
      if (opaNum > 0) {
        element.style.opacity = opaNum.toString() + "%";
      } else {
        console.log('done fading');
        element.remove();
        clearInterval(fadeoutInterval);
        clearInterval(moveInterval);
      }
      opaNum = opaNum - 10;
    }, time / 10);
  }

  clickerNummer(event: MouseEvent) {
    let cookie = document.getElementById('cookie');

    let cookieOffset = cookie.getBoundingClientRect();
    let position = {
      x: event.pageX - cookieOffset.left,
      y: event.pageY - cookieOffset.top,
    };

    let element = document.createElement('div');
    element.textContent = '+1';
    element.style.userSelect = 'none';
    element.style.position = 'absolute';
    element.style.left = position.x + 'px';
    element.style.top = position.y + 'px';

    cookie.appendChild(element);

    let movementInterval = window.setInterval(function () {
      position.y--;
      element.style.top = position.y + 'px';
    }, 10);

    this.fadeout(element, 2000, movementInterval);
  }
  //
}
