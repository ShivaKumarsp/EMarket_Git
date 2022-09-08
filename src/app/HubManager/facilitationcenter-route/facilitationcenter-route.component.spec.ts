import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitationcenterRouteComponent } from './facilitationcenter-route.component';

describe('FacilitationcenterRouteComponent', () => {
  let component: FacilitationcenterRouteComponent;
  let fixture: ComponentFixture<FacilitationcenterRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitationcenterRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitationcenterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
