import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSpecificationMapComponent } from './item-specification-map.component';

describe('ItemSpecificationMapComponent', () => {
  let component: ItemSpecificationMapComponent;
  let fixture: ComponentFixture<ItemSpecificationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSpecificationMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSpecificationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
