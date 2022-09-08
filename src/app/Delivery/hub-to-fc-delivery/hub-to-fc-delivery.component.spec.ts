import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubToFcDeliveryComponent } from './hub-to-fc-delivery.component';

describe('HubToFcDeliveryComponent', () => {
  let component: HubToFcDeliveryComponent;
  let fixture: ComponentFixture<HubToFcDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubToFcDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubToFcDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
