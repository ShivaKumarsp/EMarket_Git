import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckOutPaymentComponent } from './cart-check-out-payment.component';

describe('CartCheckOutPaymentComponent', () => {
  let component: CartCheckOutPaymentComponent;
  let fixture: ComponentFixture<CartCheckOutPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckOutPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckOutPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
