import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubManagerLoginCreationComponent } from './hub-manager-login-creation.component';

describe('HubManagerLoginCreationComponent', () => {
  let component: HubManagerLoginCreationComponent;
  let fixture: ComponentFixture<HubManagerLoginCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubManagerLoginCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubManagerLoginCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
