import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubConsignmentListComponent } from './hub-consignment-list.component';

describe('HubConsignmentListComponent', () => {
  let component: HubConsignmentListComponent;
  let fixture: ComponentFixture<HubConsignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubConsignmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubConsignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
