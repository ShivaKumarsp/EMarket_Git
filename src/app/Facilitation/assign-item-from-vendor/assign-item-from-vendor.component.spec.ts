import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignItemFromVendorComponent } from './assign-item-from-vendor.component';

describe('AssignItemFromVendorComponent', () => {
  let component: AssignItemFromVendorComponent;
  let fixture: ComponentFixture<AssignItemFromVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignItemFromVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignItemFromVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
