import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyItemListComponent } from './verify-item-list.component';

describe('VerifyItemListComponent', () => {
  let component: VerifyItemListComponent;
  let fixture: ComponentFixture<VerifyItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
