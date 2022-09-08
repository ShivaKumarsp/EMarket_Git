import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubprofileComponent } from './hubprofile.component';

describe('HubprofileComponent', () => {
  let component: HubprofileComponent;
  let fixture: ComponentFixture<HubprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
