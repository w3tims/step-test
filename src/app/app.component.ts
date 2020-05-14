import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getRandomIntInclusive} from './utils/get-random-inclusive';
import {v1 as uuidV1} from 'uuid';
import {ICloseEvenTabsMessage} from './types/close-even-tabs-message.interface';
import {ICloseEvenTabsMessageData} from './types/close-even-tabs-message-data.interface';
import {isEven} from './utils/is-even';
import {Title} from '@angular/platform-browser';
import {CrossTabMessagerService} from './services/cross-tab-messager.service';
import {Subscription} from 'rxjs';
import {CrossTabMessageType} from './types/cross-tab-message-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  randomNumber = this.getRandomNumber();
  windowId = uuidV1();

  currentUrl = this.router.url;

  crossTabMessageSubscription: Subscription;

  constructor(
    private router: Router,
    private titleService: Title,
    private crossTabMessagerService: CrossTabMessagerService,
  ) {
  }

  getRandomNumber() {
    return getRandomIntInclusive(1, 100);
  }

  ngOnInit(): void {
    this.titleService.setTitle(String(this.randomNumber));

    this.crossTabMessageSubscription = this.crossTabMessagerService.onNewMessage
      .subscribe((newMessage: ICloseEvenTabsMessage)  => {
        if (newMessage.type === CrossTabMessageType.CloseEvenTabs) {
          this.onCloseEvenTabs(newMessage.data);
        }
      });
  }

  closeEvenTabsEmit() {
    this.crossTabMessagerService.postCloseEvenTabsMessage(this.windowId);
  }

  onCloseEvenTabs(data: ICloseEvenTabsMessageData) {
    if (this.windowId !== data?.sourceId && isEven(this.randomNumber)) {
      window.close();
    }
  }

  ngOnDestroy(): void {
    // though it doesn't have much sense in root component :)
    this.crossTabMessageSubscription.unsubscribe();
  }
}


