import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAddressesComponent } from './view-all-addresses.component';

describe('ViewAllAddressesComponent', () => {
  let component: ViewAllAddressesComponent;
  let fixture: ComponentFixture<ViewAllAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllAddressesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
