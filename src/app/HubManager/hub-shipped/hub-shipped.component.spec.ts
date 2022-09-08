import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubShippedComponent } from './hub-shipped.component';

describe('HubShippedComponent', () => {
  let component: HubShippedComponent;
  let fixture: ComponentFixture<HubShippedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubShippedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
