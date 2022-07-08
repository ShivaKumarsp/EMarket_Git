import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHandoverComponent } from './item-handover.component';

describe('ItemHandoverComponent', () => {
  let component: ItemHandoverComponent;
  let fixture: ComponentFixture<ItemHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHandoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
