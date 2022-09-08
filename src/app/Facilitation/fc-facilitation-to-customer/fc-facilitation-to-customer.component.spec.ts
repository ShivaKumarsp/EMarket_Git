import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcFacilitationToCustomerComponent } from './fc-facilitation-to-customer.component';

describe('FcFacilitationToCustomerComponent', () => {
  let component: FcFacilitationToCustomerComponent;
  let fixture: ComponentFixture<FcFacilitationToCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcFacilitationToCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcFacilitationToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
