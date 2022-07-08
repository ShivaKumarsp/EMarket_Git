import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCartPlaceOrderComponent } from './direct-cart-place-order.component';

describe('DirectCartPlaceOrderComponent', () => {
  let component: DirectCartPlaceOrderComponent;
  let fixture: ComponentFixture<DirectCartPlaceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectCartPlaceOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCartPlaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
