import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAdditionalCategoryComponent } from './master-additional-category.component';

describe('MasterAdditionalCategoryComponent', () => {
  let component: MasterAdditionalCategoryComponent;
  let fixture: ComponentFixture<MasterAdditionalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterAdditionalCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAdditionalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
