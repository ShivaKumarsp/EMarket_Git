import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryToCustomerComponent } from './delivery-to-customer.component';

describe('DeliveryToCustomerComponent', () => {
  let component: DeliveryToCustomerComponent;
  let fixture: ComponentFixture<DeliveryToCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryToCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
