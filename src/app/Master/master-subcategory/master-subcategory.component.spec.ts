import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSubcategoryComponent } from './master-subcategory.component';

describe('MasterSubcategoryComponent', () => {
  let component: MasterSubcategoryComponent;
  let fixture: ComponentFixture<MasterSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
