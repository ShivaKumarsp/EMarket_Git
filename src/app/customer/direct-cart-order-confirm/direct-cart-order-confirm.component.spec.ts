import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCartOrderConfirmComponent } from './direct-cart-order-confirm.component';

describe('DirectCartOrderConfirmComponent', () => {
  let component: DirectCartOrderConfirmComponent;
  let fixture: ComponentFixture<DirectCartOrderConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectCartOrderConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCartOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
