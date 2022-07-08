import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAllOrderComponent } from './vendor-all-order.component';

describe('VendorAllOrderComponent', () => {
  let component: VendorAllOrderComponent;
  let fixture: ComponentFixture<VendorAllOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAllOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAllOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
