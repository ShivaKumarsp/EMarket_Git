import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderVerifyComponent } from './cancel-order-verify.component';

describe('CancelOrderVerifyComponent', () => {
  let component: CancelOrderVerifyComponent;
  let fixture: ComponentFixture<CancelOrderVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelOrderVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelOrderVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
