import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorVerifyComponent } from './vendor-verify.component';

describe('VendorVerifyComponent', () => {
  let component: VendorVerifyComponent;
  let fixture: ComponentFixture<VendorVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
