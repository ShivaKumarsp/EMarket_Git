import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCartComponent } from './direct-cart.component';

describe('DirectCartComponent', () => {
  let component: DirectCartComponent;
  let fixture: ComponentFixture<DirectCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
