import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAttributeNameComponent } from './master-attribute-name.component';

describe('MasterAttributeNameComponent', () => {
  let component: MasterAttributeNameComponent;
  let fixture: ComponentFixture<MasterAttributeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterAttributeNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAttributeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
