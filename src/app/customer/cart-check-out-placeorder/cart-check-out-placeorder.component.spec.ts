import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCheckOutPlaceorderComponent } from './cart-check-out-placeorder.component';

describe('CartCheckOutPlaceorderComponent', () => {
  let component: CartCheckOutPlaceorderComponent;
  let fixture: ComponentFixture<CartCheckOutPlaceorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartCheckOutPlaceorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckOutPlaceorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
