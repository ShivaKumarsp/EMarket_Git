import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitationManagerListComponent } from './facilitation-manager-list.component';

describe('FacilitationManagerListComponent', () => {
  let component: FacilitationManagerListComponent;
  let fixture: ComponentFixture<FacilitationManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilitationManagerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitationManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
