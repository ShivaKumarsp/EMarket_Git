import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHubToHubComponent } from './send-hub-to-hub.component';

describe('SendHubToHubComponent', () => {
  let component: SendHubToHubComponent;
  let fixture: ComponentFixture<SendHubToHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendHubToHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHubToHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
