import { TestBed } from '@angular/core/testing';

import { PrintsService } from './prints.service';

describe('PrintsService', () => {
  let service: PrintsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
