import { TestBed } from '@angular/core/testing';

import { StandardProductService } from './standard-product.service';

describe('StandardProductService', () => {
  let service: StandardProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
