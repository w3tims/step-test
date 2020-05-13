import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {getRandomIntInclusive} from './utils/get-random-inclusive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  randomNumber = this.getRandomNumber();
  currentUrl = this.router.url;

  constructor(
    private router: Router,
  ) {
  }

  getRandomNumber() {
    return getRandomIntInclusive(1, 100);
  }
}


// at first - don't think about browser close.

// ngOnInit push { randomNumber, tabId }

// onCloseTab: array.filter(w/o closed tab)


