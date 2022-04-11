import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedMainComponent } from './customized-main.component';

describe('CustomizedMainComponent', () => {
  let component: CustomizedMainComponent;
  let fixture: ComponentFixture<CustomizedMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
