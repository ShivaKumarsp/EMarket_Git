import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckOutAddressComponent } from './cart-check-out-address.component';

describe('CartCheckOutAddressComponent', () => {
  let component: CartCheckOutAddressComponent;
  let fixture: ComponentFixture<CartCheckOutAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckOutAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckOutAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
