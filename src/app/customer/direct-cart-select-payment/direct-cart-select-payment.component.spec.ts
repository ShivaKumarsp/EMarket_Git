import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCartSelectPaymentComponent } from './direct-cart-select-payment.component';

describe('DirectCartSelectPaymentComponent', () => {
  let component: DirectCartSelectPaymentComponent;
  let fixture: ComponentFixture<DirectCartSelectPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectCartSelectPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCartSelectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
