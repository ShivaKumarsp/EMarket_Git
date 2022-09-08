import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubtofacilitationcenterComponent } from './hubtofacilitationcenter.component';

describe('HubtofacilitationcenterComponent', () => {
  let component: HubtofacilitationcenterComponent;
  let fixture: ComponentFixture<HubtofacilitationcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubtofacilitationcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubtofacilitationcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
