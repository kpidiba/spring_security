import { TestBed } from '@angular/core/testing';

import { TokenExpiredServiceService } from './token-expired-service.service';

describe('TokenExpiredServiceService', () => {
  let service: TokenExpiredServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenExpiredServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
