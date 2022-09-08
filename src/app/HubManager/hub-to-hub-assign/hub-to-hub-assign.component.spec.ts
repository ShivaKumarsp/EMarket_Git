import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubToHubAssignComponent } from './hub-to-hub-assign.component';

describe('HubToHubAssignComponent', () => {
  let component: HubToHubAssignComponent;
  let fixture: ComponentFixture<HubToHubAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubToHubAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubToHubAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
