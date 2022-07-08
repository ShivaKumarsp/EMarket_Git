import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSpecificationForVendorComponent } from './item-specification-for-vendor.component';

describe('ItemSpecificationForVendorComponent', () => {
  let component: ItemSpecificationForVendorComponent;
  let fixture: ComponentFixture<ItemSpecificationForVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSpecificationForVendorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSpecificationForVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
