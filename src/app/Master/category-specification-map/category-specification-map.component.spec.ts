import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySpecificationMapComponent } from './category-specification-map.component';

describe('CategorySpecificationMapComponent', () => {
  let component: CategorySpecificationMapComponent;
  let fixture: ComponentFixture<CategorySpecificationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySpecificationMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySpecificationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
