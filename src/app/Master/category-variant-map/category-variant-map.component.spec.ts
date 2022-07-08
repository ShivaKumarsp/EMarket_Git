import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryVariantMapComponent } from './category-variant-map.component';

describe('CategoryVariantMapComponent', () => {
  let component: CategoryVariantMapComponent;
  let fixture: ComponentFixture<CategoryVariantMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryVariantMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryVariantMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
