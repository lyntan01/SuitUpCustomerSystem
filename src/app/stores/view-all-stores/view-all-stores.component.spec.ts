import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllStoresComponent } from './view-all-stores.component';

describe('ViewAllStoresComponent', () => {
  let component: ViewAllStoresComponent;
  let fixture: ComponentFixture<ViewAllStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
