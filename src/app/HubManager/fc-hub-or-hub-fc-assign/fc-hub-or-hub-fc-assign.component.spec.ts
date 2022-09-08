import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcHubOrHubFcAssignComponent } from './fc-hub-or-hub-fc-assign.component';

describe('FcHubOrHubFcAssignComponent', () => {
  let component: FcHubOrHubFcAssignComponent;
  let fixture: ComponentFixture<FcHubOrHubFcAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcHubOrHubFcAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcHubOrHubFcAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
