import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderRequestComponent } from './cancel-order-request.component';

describe('CancelOrderRequestComponent', () => {
  let component: CancelOrderRequestComponent;
  let fixture: ComponentFixture<CancelOrderRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelOrderRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
