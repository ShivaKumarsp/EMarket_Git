import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubArrivedDestinationComponent } from './hub-arrived-destination.component';

describe('HubArrivedDestinationComponent', () => {
  let component: HubArrivedDestinationComponent;
  let fixture: ComponentFixture<HubArrivedDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubArrivedDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubArrivedDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
