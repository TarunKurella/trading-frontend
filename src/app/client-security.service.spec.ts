import { TestBed } from '@angular/core/testing';

import { ClientSecurityService } from './client-security.service';

describe('ClientSecurityService', () => {
  let service: ClientSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
