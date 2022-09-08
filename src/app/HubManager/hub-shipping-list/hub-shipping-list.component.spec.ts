import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubShippingListComponent } from './hub-shipping-list.component';

describe('HubShippingListComponent', () => {
  let component: HubShippingListComponent;
  let fixture: ComponentFixture<HubShippingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubShippingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubShippingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
