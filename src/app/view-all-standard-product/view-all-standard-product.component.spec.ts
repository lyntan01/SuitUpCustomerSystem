import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllStandardProductComponent } from './view-all-standard-product.component';

describe('ViewAllStandardProductComponent', () => {
  let component: ViewAllStandardProductComponent;
  let fixture: ComponentFixture<ViewAllStandardProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllStandardProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllStandardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
