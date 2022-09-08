import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleimageComponent } from './add-multipleimage.component';

describe('AddMultipleimageComponent', () => {
  let component: AddMultipleimageComponent;
  let fixture: ComponentFixture<AddMultipleimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
