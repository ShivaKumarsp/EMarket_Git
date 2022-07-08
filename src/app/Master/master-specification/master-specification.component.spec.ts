import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSpecificationComponent } from './master-specification.component';

describe('MasterSpecificationComponent', () => {
  let component: MasterSpecificationComponent;
  let fixture: ComponentFixture<MasterSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
