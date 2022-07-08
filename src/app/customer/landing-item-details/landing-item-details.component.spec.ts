import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingItemDetailsComponent } from './landing-item-details.component';

describe('LandingItemDetailsComponent', () => {
  let component: LandingItemDetailsComponent;
  let fixture: ComponentFixture<LandingItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
