import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitationConsignmentComponent } from './facilitation-consignment.component';

describe('FacilitationConsignmentComponent', () => {
  let component: FacilitationConsignmentComponent;
  let fixture: ComponentFixture<FacilitationConsignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitationConsignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitationConsignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
