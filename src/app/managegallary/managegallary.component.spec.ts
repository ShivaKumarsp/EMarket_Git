import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagegallaryComponent } from './managegallary.component';

describe('ManagegallaryComponent', () => {
  let component: ManagegallaryComponent;
  let fixture: ComponentFixture<ManagegallaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagegallaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagegallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
