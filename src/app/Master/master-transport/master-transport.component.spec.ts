import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTransportComponent } from './master-transport.component';

describe('MasterTransportComponent', () => {
  let component: MasterTransportComponent;
  let fixture: ComponentFixture<MasterTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
