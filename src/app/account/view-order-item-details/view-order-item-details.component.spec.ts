import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderItemDetailsComponent } from './view-order-item-details.component';

describe('ViewOrderItemDetailsComponent', () => {
  let component: ViewOrderItemDetailsComponent;
  let fixture: ComponentFixture<ViewOrderItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrderItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
