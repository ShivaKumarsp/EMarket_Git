import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReassignComponent } from './vendor-reassign.component';

describe('VendorReassignComponent', () => {
  let component: VendorReassignComponent;
  let fixture: ComponentFixture<VendorReassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorReassignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
