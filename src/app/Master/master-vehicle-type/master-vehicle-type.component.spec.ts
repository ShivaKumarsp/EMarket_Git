import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterVehicleTypeComponent } from './master-vehicle-type.component';

describe('MasterVehicleTypeComponent', () => {
  let component: MasterVehicleTypeComponent;
  let fixture: ComponentFixture<MasterVehicleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterVehicleTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
