import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOrderVerifyComponent } from './return-order-verify.component';

describe('ReturnOrderVerifyComponent', () => {
  let component: ReturnOrderVerifyComponent;
  let fixture: ComponentFixture<ReturnOrderVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnOrderVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
