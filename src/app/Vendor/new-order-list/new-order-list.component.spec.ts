import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderListComponent } from './new-order-list.component';

describe('NewOrderListComponent', () => {
  let component: NewOrderListComponent;
  let fixture: ComponentFixture<NewOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
