import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCartAddressComponent } from './direct-cart-address.component';

describe('DirectCartAddressComponent', () => {
  let component: DirectCartAddressComponent;
  let fixture: ComponentFixture<DirectCartAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectCartAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCartAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
