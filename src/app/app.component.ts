import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  
  timer = setInterval(() => {
    this.earthrandom();
  }, 5000);

earthrandom() {
  const earthrandom = (document.getElementById('randomcookie') as HTMLInputElement);
  const horizontal = Math.floor(Math.random() * 1000) + 1;
  const vertical = Math.floor(Math.random() * 700) + 1;
  earthrandom.style.marginLeft = horizontal+"px";
  earthrandom.style.marginTop = vertical+"px";

  var timer = setInterval(() => {
    earthrandom.style.display = "initial";
  }, 1000);
  earthrandom.style.display="none";
}

}

