import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefacilitationcenterComponent } from './managefacilitationcenter.component';

describe('ManagefacilitationcenterComponent', () => {
  let component: ManagefacilitationcenterComponent;
  let fixture: ComponentFixture<ManagefacilitationcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagefacilitationcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagefacilitationcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
