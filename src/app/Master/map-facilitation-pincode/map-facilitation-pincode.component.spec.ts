import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapFacilitationPincodeComponent } from './map-facilitation-pincode.component';

describe('MapFacilitationPincodeComponent', () => {
  let component: MapFacilitationPincodeComponent;
  let fixture: ComponentFixture<MapFacilitationPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapFacilitationPincodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapFacilitationPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
