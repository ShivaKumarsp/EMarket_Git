import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProductCategoryComponent } from './public-product-category.component';

describe('PublicProductCategoryComponent', () => {
  let component: PublicProductCategoryComponent;
  let fixture: ComponentFixture<PublicProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProductCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
