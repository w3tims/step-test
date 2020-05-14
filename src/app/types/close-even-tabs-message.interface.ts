import {ICloseEvenTabsMessageData} from './close-even-tabs-message-data.interface';
import {CrossTabMessageType} from './cross-tab-message-type.enum';

export interface ICloseEvenTabsMessage {
  type: CrossTabMessageType.CloseEvenTabs;
  data: ICloseEvenTabsMessageData;
}
