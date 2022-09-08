import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHubVehicleComponent } from './create-hub-vehicle.component';

describe('CreateHubVehicleComponent', () => {
  let component: CreateHubVehicleComponent;
  let fixture: ComponentFixture<CreateHubVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHubVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHubVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
