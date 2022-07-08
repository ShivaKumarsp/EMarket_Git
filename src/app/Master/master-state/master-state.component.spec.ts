import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStateComponent } from './master-state.component';

describe('MasterStateComponent', () => {
  let component: MasterStateComponent;
  let fixture: ComponentFixture<MasterStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
