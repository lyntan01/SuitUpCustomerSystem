import { TestBed } from '@angular/core/testing';

import { Customization } from './customization.service';

describe('CustomizationService', () => {
  let service: Customization;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Customization);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
