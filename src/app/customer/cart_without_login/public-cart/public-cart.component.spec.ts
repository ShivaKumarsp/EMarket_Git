import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCartComponent } from './public-cart.component';

describe('PublicCartComponent', () => {
  let component: PublicCartComponent;
  let fixture: ComponentFixture<PublicCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
