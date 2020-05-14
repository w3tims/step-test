import {CrossTabMessageType} from './cross-tab-message-type.enum';

export interface ICrossTabMessage {
  type: CrossTabMessageType;
  data: any;
}
