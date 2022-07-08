import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderwisePaymentListComponent } from './orderwise-payment-list.component';

describe('OrderwisePaymentListComponent', () => {
  let component: OrderwisePaymentListComponent;
  let fixture: ComponentFixture<OrderwisePaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderwisePaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderwisePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
