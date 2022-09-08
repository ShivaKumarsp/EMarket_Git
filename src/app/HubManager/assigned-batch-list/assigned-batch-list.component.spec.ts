import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedBatchListComponent } from './assigned-batch-list.component';

describe('AssignedBatchListComponent', () => {
  let component: AssignedBatchListComponent;
  let fixture: ComponentFixture<AssignedBatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedBatchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedBatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
