import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapitemspecificationComponent } from './mapitemspecification.component';

describe('MapitemspecificationComponent', () => {
  let component: MapitemspecificationComponent;
  let fixture: ComponentFixture<MapitemspecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapitemspecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapitemspecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
