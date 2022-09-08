import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcToHubDeliveryComponent } from './fc-to-hub-delivery.component';

describe('FcToHubDeliveryComponent', () => {
  let component: FcToHubDeliveryComponent;
  let fixture: ComponentFixture<FcToHubDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcToHubDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcToHubDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
