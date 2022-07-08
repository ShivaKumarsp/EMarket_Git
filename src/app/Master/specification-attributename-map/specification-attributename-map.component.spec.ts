import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationAttributenameMapComponent } from './specification-attributename-map.component';

describe('SpecificationAttributenameMapComponent', () => {
  let component: SpecificationAttributenameMapComponent;
  let fixture: ComponentFixture<SpecificationAttributenameMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificationAttributenameMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationAttributenameMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
