import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHandoverListComponent } from './item-handover-list.component';

describe('ItemHandoverListComponent', () => {
  let component: ItemHandoverListComponent;
  let fixture: ComponentFixture<ItemHandoverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHandoverListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHandoverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
