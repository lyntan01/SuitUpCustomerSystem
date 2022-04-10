import { TestBed } from '@angular/core/testing';

import { CustomizedProductService } from './customized-product.service';

describe('CustomizationService', () => {
  let service: CustomizedProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizedProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
