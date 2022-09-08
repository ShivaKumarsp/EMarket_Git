import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcConsignmentListComponent } from './fc-consignment-list.component';

describe('FcConsignmentListComponent', () => {
  let component: FcConsignmentListComponent;
  let fixture: ComponentFixture<FcConsignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcConsignmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcConsignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
