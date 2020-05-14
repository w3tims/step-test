import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {getRandomIntInclusive} from './utils/get-random-inclusive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  randomNumber = this.getRandomNumber();
  currentUrl = this.router.url;

  //

  sharedWorker: SharedWorker.SharedWorker;

  constructor(
    private router: Router,
  ) {
  }

  getRandomNumber() {
    return getRandomIntInclusive(1, 100);
  }

  ngOnInit(): void {
    this.sharedWorker = new SharedWorker('/assets/shared-worker.worker.js');
    this.sharedWorker.port.onmessage = ({data}) => {
      console.log('message data:', data);
    };
    this.sharedWorker.port.start();
  }

  postMessage() {
    this.sharedWorker.port.postMessage('message hello');
  }
}


