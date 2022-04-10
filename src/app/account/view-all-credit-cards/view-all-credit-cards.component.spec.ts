import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCreditCardsComponent } from './view-all-credit-cards.component';

describe('ViewAllCreditCardsComponent', () => {
  let component: ViewAllCreditCardsComponent;
  let fixture: ComponentFixture<ViewAllCreditCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllCreditCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllCreditCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
