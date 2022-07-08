import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAttributeValueComponent } from './master-attribute-value.component';

describe('MasterAttributeValueComponent', () => {
  let component: MasterAttributeValueComponent;
  let fixture: ComponentFixture<MasterAttributeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterAttributeValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAttributeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
