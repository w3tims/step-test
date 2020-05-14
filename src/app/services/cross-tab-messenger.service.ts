import {EventEmitter, Injectable} from '@angular/core';
import {ICrossTabMessage} from '../types/cross-tab-message.interface';
import {ICloseEvenTabsMessage} from '../types/close-even-tabs-message.interface';
import {CrossTabMessageType} from '../types/cross-tab-message-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CrossTabMessengerService {
  sharedWorker: SharedWorker.SharedWorker;
  onNewMessage = new EventEmitter<ICloseEvenTabsMessage>();

  constructor() {
    this.sharedWorker = new SharedWorker('/assets/shared-worker.worker.js');
    this.sharedWorker.port.onmessage = (event) => {
      const messageData = event.data as ICrossTabMessage;
      this.onNewMessage.emit(messageData);
    };
    this.sharedWorker.port.start();
  }

  postMessage(message: ICrossTabMessage) {
    this.sharedWorker.port.postMessage(message);
  }

  postCloseEvenTabsMessage(sourceId: string) {
    const message = this.createCloseEvenTabsMessage(sourceId);
    this.postMessage(message);
  }

  createCloseEvenTabsMessage(sourceId: string): ICloseEvenTabsMessage {
    return {
      type: CrossTabMessageType.CloseEvenTabs,
      data: { sourceId }
    };
  }
}
