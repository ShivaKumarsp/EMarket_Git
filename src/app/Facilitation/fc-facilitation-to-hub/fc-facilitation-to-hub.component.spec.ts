import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcFacilitationToHubComponent } from './fc-facilitation-to-hub.component';

describe('FcFacilitationToHubComponent', () => {
  let component: FcFacilitationToHubComponent;
  let fixture: ComponentFixture<FcFacilitationToHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcFacilitationToHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcFacilitationToHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
