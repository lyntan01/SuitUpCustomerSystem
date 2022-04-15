import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllSupportTicketsComponent } from './view-all-support-tickets.component';

describe('ViewAllSupportTicketsComponent', () => {
  let component: ViewAllSupportTicketsComponent;
  let fixture: ComponentFixture<ViewAllSupportTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllSupportTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllSupportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
