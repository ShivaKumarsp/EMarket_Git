import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecificationMapComponent } from './product-specification-map.component';

describe('ProductSpecificationMapComponent', () => {
  let component: ProductSpecificationMapComponent;
  let fixture: ComponentFixture<ProductSpecificationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSpecificationMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecificationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
