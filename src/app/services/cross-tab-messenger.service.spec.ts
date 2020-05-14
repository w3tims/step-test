import { TestBed } from '@angular/core/testing';

import { CrossTabMessengerService } from './cross-tab-messenger.service';

describe('CrossTabMessengerService', () => {
  let service: CrossTabMessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossTabMessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
