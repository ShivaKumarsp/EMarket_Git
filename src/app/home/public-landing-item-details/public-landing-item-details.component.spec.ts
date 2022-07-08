import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLandingItemDetailsComponent } from './public-landing-item-details.component';

describe('PublicLandingItemDetailsComponent', () => {
  let component: PublicLandingItemDetailsComponent;
  let fixture: ComponentFixture<PublicLandingItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLandingItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLandingItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
