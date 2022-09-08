import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveHubToHubComponent } from './receive-hub-to-hub.component';

describe('ReceiveHubToHubComponent', () => {
  let component: ReceiveHubToHubComponent;
  let fixture: ComponentFixture<ReceiveHubToHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveHubToHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveHubToHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
