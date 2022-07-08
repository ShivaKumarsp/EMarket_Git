import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderTrackComponent } from './customer-order-track.component';

describe('CustomerOrderTrackComponent', () => {
  let component: CustomerOrderTrackComponent;
  let fixture: ComponentFixture<CustomerOrderTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrderTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
