import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFacilitationComponent } from './master-facilitation.component';

describe('MasterFacilitationComponent', () => {
  let component: MasterFacilitationComponent;
  let fixture: ComponentFixture<MasterFacilitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterFacilitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFacilitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
