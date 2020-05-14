import { TestBed } from '@angular/core/testing';

import { CrossTabMessagerService } from './cross-tab-messager.service';

describe('CrossTabMessagerService', () => {
  let service: CrossTabMessagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrossTabMessagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
