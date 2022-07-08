import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLandingCategoryComponent } from './public-landing-category.component';

describe('PublicLandingCategoryComponent', () => {
  let component: PublicLandingCategoryComponent;
  let fixture: ComponentFixture<PublicLandingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicLandingCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLandingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
